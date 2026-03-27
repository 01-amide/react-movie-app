import type { Movie } from "../types"

  

const Moviecard = ({movie: {title, poster_path, vote_average, release_date, original_language }}: {movie: Movie}) => {
  return (
    
    <div className='movie-card'>
        {poster_path ? (
            <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={title}
            />
            ) : (
            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex flex-col items-center justify-center gap-2">
                <span className="text-4xl">🎬</span>
                <p className="text-gray-400 text-sm text-center px-4">No poster available</p>
            </div>
        )}
                <div className="mt-4"><h3>{title}</h3></div>

        <div className="content">
            <div className="rating">
                <img src="icons8-star-48.png" alt="star-icon" />
                <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                <span>•</span>
                <p className="lang">{original_language}</p>
                <span>•</span>
                <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
            </div>
        </div>
    </div>
  )
}

export default Moviecard