import starIcon from '../../assets/icons/staricon.svg'
import './styles.scss'

type CardProps = {
  id: number
  title: string
  vote_average: number
  poster_path: string
  onClick: (id: number) => void

}

export function Card({ id, title, vote_average, poster_path, onClick
}: CardProps) {
  return (
    <div className='MovieGalery'>


      <div className="cardContainer" onClick={() => onClick(id)}>
        <div className="cardContent">
          <img className="thumbnail" src={`https://image.tmdb.org/t/p/original${poster_path}`} />
          <div className="ranking">
            <img src={starIcon} alt="rating" />
            <span>{vote_average}</span>
          </div>
        </div>
        <footer className="titleCard">
          <strong >{title}</strong>
        </footer>
      </div>
    </div>
  )
}
