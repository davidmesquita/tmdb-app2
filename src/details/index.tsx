import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ContentDetail, useContent } from "../hooks/useContent"
import starIcon from '../assets/icons/staricon.svg'
import './styles.scss'

export function Details() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original"
  const { id, typeContent } = useParams()
  const { loadMovieDetails, loadTvShowDetails } = useContent()
  const [content, setContent] = useState<ContentDetail>()

  async function loadContent() {
    let response: ContentDetail
    if (typeContent === "movie") {
      response = await loadMovieDetails(+String(id))
    } else {
      response = await loadTvShowDetails(+String(id))
    }
    setContent(response)
  }
  useEffect(() => {
    loadContent()
  }, [])
  return (

    <div className="DetailsContainer">
      <section className="ContentBanner">
        <div className="BackgroudBanner">
          <img className="ImageBanner" src={`${IMAGE_PATH}${content?.backdrop_path}`} alt="" />
        </div>
        <div className="TitleContent">
          <span>
            MaileHereko / {typeContent}
          </span>
          <h1>{content?.original_name || content?.original_title}</h1>
        </div>
      </section>

      <section className="InfosContent">
        <div className="ContainerPorter">
          <img className="ImagePoster" src={`${IMAGE_PATH}${content?.poster_path}`} alt="" />
        </div>
        <div className="InfosContainer" >
          <h3 className="InfoTitle">{content?.tagline}</h3>
          <p className="Overview">{content?.overview}</p>
          <div className="Rankingcontainer">
            <img src={starIcon} alt="" />
            <span>
              {content?.vote_average}
            </span>
          </div>
          {typeContent === "movie" ? (
            <div className="MovieInfos">
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span>Type</span>
                  <strong>
                    {typeContent}
                  </strong>
                </div>
                <div className="StatusInfoContentContainer">
                  <span>Status</span>
                  <strong>{content?.status}</strong>
                </div>
              </div>
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span> Release Date </span>
                  <strong>
                    {content?.release_date}
                  </strong>
                </div>
              </div>
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span> Run Time </span>
                  <strong>
                    {content?.runtime} min
                  </strong>
                </div>
              </div>
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span> Genres </span>
                  <strong>
                    {content?.genres.map(
                      (g, i) => `${g.name}${i !== content.genres.length - 1 ? " | " : " "}`
                    )}
                  </strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="MovieInfos">
               <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span>Type</span>
                  <strong>
                    {typeContent}
                  </strong>
                </div>
                <div className="StatusInfoContentContainer">
                  <span>Status</span>
                  <strong>{content?.status}</strong>
                </div>
              </div>
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span>First air date</span>
                  <strong>
                    {content?.first_air_date}
                  </strong>
                </div>
                <div className="StatusInfoContentContainer">
                  <span>Last air date</span>
                  <strong>{content?.last_air_date}</strong>
                </div>
              </div>
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span>No. of Seasons</span>
                  <strong>
                    {content?.number_of_seasons}
                  </strong>
                </div>
                <div className="StatusInfoContentContainer">
                  <span>No. of Episodes</span>
                  <strong>{content?.number_of_episodes}</strong>
                </div>
              </div> 
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span>Episode run time</span>
                  <strong>
                    {content?.episode_run_time} min
                  </strong>
                </div>
              </div>
              <div className="StatusInfoContainer">
                <div className="StatusInfoContentContainer">
                  <span> Genres </span>
                  <strong>
                    {content?.genres.map(
                      (g, i) => `${g.name}${i !== content.genres.length - 1 ? " | " : " "}`
                    )}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}