import { api, apiKey } from "../api"

export type ContentData = {
  id: number
  title: string
  original_name: string
  poster_path: string
  backdrop_path: string
  vote_average: number
}
export type Genre = {
  id: number
  name: string
}
interface TheMoviesDBResponse<T> {
  results: T
}
export type ContentDetail = {
  id: number
  original_name: string
  original_title: string
  backdrop_path: string
  poster_path: string
  vote_average: number
  overview: string
  release_date: string
  status: string
  genres: Genre[]
  tagline: string
  number_of_episodes: number
  number_of_seasons: number
  first_air_date: string
  last_air_date: string
  runtime: number
  episode_run_time: number
}


export function useContent(query?:string) {
  async function loadMovies(): Promise<ContentData[]> {

    const response = await api.get<TheMoviesDBResponse<ContentData[]>>(
      `/movie/popular/?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data.results;
  }
  async function loadSearchResults(): Promise<ContentData[]> {

    const response = await api.get<TheMoviesDBResponse<ContentData[]>>(
      `/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  }
  
  async function loadMovieDetails(id: number): Promise<ContentDetail> {
    const response = await api.get<ContentDetail>(
      `/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    return response.data
  }
  async function loadTvShows(): Promise<ContentData[]> {

    const response = await api.get<TheMoviesDBResponse<ContentData[]>>(
      `/tv/popular/?api_key=${apiKey}&language=en-US&page=1`
    );
    return response.data.results;

  }

  async function loadTvShowDetails(id: number): Promise<ContentDetail> {
    const response = await api.get<ContentDetail>(
      `/tv/${id}?api_key=${apiKey}&language=en-US`
    );
    return response.data;
  }


 
  return {

    loadTvShows,
    loadTvShowDetails,
    loadMovies,
    loadMovieDetails,
    loadSearchResults
  }
}