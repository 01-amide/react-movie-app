import { Client, Databases, ID, Query } from "appwrite"
import type { Movie } from './types'
// import console from "console"

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(PROJECT_ID) 

const database = new Databases(client)


export const updateSearchCount = async (searchTerm : string, movie: Movie) => {
    //1. use appwrite SDk to check if the searchTerm exist in the database
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            TABLE_ID,
            [Query.equal("searchTerm", [searchTerm])]
          );
          
          //2. if it does, update the count 
          if(result.documents.length > 0) {
            const doc = result.documents[0]


            await database.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, {
                count: doc.count + 1
            })
            //3. if it doesnt create a new document with the serach term and set the count as 1
          } else {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
          }

    } catch (error) {
        console.error(error)
    }

}

export const getTrendingMovies = async (): Promise<Movie[]> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            TABLE_ID,
            [Query.limit(5), Query.orderDesc("count")]
        )

        return result.documents as unknown as Movie[]  // ✅ cast to Movie[]
    } catch (error) {
        console.error(error)
        return []  // ✅ always return an array, never undefined
    }
}