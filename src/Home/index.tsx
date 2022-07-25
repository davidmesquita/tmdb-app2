import '../styles/global.scss'
import './styles.scss'
import { Filters } from '../components/Filter'
import { Card } from '../components/CardMovie'
import { useFiltersContext, Filter } from '../components/context/filterContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../hooks/useContent'
import searchicon from '../assets/icons/searchicon.svg'

type ContentData = {
  id: number
  title: string
  original_name: string
  poster_path: string
  vote_average: number
}
type SearchProps = {
  id: number
  title: string
  onChange: (text: string) => void
}
type searchResultsData = {
  id: number
  title: string
  original_name: string
  poster_path: string
  vote_average: number

}
export function Home() {
  const { filters, currentFilter, setCurrentFilter } = useFiltersContext()
  const [data, setData] = useState<ContentData[]>([])
  const [query, setQuery] = useState("")
  const [searchResults, setSearchResults] = useState<ContentData[]>([])

  const { loadMovies, loadTvShows, loadSearchResults } = useContent(query)
  const navigate = useNavigate()

  async function handleFilterChange(filter: Filter) {
    setCurrentFilter(filter)

    if (filter.title === 'Movies') {
      const movies = await loadMovies()

      setData(movies)
    }
    if (filter.title === 'Tv Shows') {
      const tvShows = await loadTvShows()

      setData(tvShows)
    }
    if (filter.title === 'All') {
      const tvShows = await loadTvShows()
      const movies = await loadMovies()

      setData([...tvShows, ...movies])
    }
  }
  useEffect(() => {
    handleFilterChange(currentFilter)
  }, [currentFilter])

  function navigateDetails(id: number, typeOfContent: string) {
    navigate(`/detail/${typeOfContent}/${id}`)
  }
  async function getSearchResults(){
    const searchResults = loadSearchResults()
    setSearchResults(await searchResults)
  }
  useEffect(() => {
    if (query) {
      getSearchResults()
    }
  }, [query])

  return (
    <div className='container'>
      <section className='pageContainer'>
        <h1 className='title'>
          MaileHereko
        </h1>
        <p className='description'>
          List of movies and TV Shows, <span>I, Pramod Poudel</span> have
          watched till date. Explore what I have watched and also feel free to
          make a suggestion. 😉
        </p>
        <div className="inputTxt">
          <div id='form' className='inputContainer'>
            <img src={searchicon}>
            </img>
            <input type="search" value={query} id='search'
              placeholder='Search Movies or TV Shows'
              onChange={(e) => setQuery(e.target.value)}
            >
            </input>
          </div >
        </div>
      </section>
      {query.length > 0 ?
        <>
          <section>
            <header className="category">
              <strong>Results ({searchResults.length})</strong>
            </header>
            <div className='MovieGalery'>
              {searchResults?.map((content) => (
                <Card key={content.id}
                  id={content.id}
                  title={content.title || content.original_name}
                  poster_path={content.poster_path}
                  vote_average={content.vote_average}
                  onClick={() => { navigateDetails(content.id, content.title ? 'movie' : 'tv') }}
                />
              ))}
            </div>
          </section>
        </> :
        <>
          <div className='tabFilter'>
            <Filters />

          </div>

          <section>
            <header className="category">
              <strong>{currentFilter.title} ({data.length})</strong>

            </header>

            <div className='MovieGalery'>
              {data?.map((content) => (
                <Card key={content.id}
                  id={content.id}
                  title={content.title || content.original_name}
                  poster_path={content.poster_path}
                  vote_average={content.vote_average}
                  onClick={() => { navigateDetails(content.id, content.title ? 'movie' : 'tv') }}
                />
              ))}
            </div>
          </section>
        </>
      }
    </div>
  )
}
