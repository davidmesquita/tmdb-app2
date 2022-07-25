import '../styles/global.scss'
import './styles.scss'
import { InputTxt } from '../components/InputTxt'
import { Filters } from '../components/Filter'
import { Card } from '../components/CardMovie'
import { useFiltersContext, Filter } from '../components/context/filterContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../hooks/useContent'
import {apiKey} from '../api'

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


export function Home() {
  const { filters, currentFilter, setCurrentFilter } = useFiltersContext()
  const [data, setData] = useState<ContentData[]>([])
  const [query, setQuery] = useState("")
  

  const { loadMovies, loadTvShows } = useContent()
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
  const searchTitle=()=>{}
 
  
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
          <InputTxt onChange={e => setQuery(e.target.value)}/>
         
        </div>
      </section>
      <div className='tabFilter'>
        <Filters />

      </div>
      <section>
        <header className="category">
          <strong>{currentFilter.title}</strong>

        </header>
        <>
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
        </>



      </section>
    </div>
  )

}
