
interface props {
    searchTerm : string;
    setSearchTerm: (value: string) => void;
}

const Search = ({searchTerm, setSearchTerm}: props) => {
  return (
    <div className='search'>
        <div>
            <img src="/icons8-search.svg" alt="searchbar" />
            <input 
                type="text"
                placeholder="Search through thousands of movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
    </div>
  )
}

export default Search