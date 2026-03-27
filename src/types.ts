import type { Models } from "appwrite"

export interface Movie extends Models.Document {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  original_language: string;
  searchTerm: string;
  count: number;
  movie_id: number;
  poster_url: string;
}