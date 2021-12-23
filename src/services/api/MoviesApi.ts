import { api, key } from '../api'

class MoviesApi {
  public async searchMovie(name: string) {
    return await api.get('/search/movie', {
      params: {
        query: name,
        api_key: key,
        language: 'pt-BR',
        page: 1
      }
    })
  }

  public async moviesInTheaters() {
    return await api.get('/movie/now_playing', {
      params: {
        api_key: key,
        language: 'pt-BR',
        page: 1
      }
    })
  }

  public async popularMovies() {
    return await api.get('/movie/popular', {
      params: {
        api_key: key,
        language: 'pt-BR',
        page: 1
      }
    })
  }

  public async topRatedMovies() {
    return await api.get('/movie/top_rated', {
      params: {
        api_key: key,
        language: 'pt-BR',
        page: 1
      }
    })
  }

  public async detailedFilm(id: number) {
    return await api.get(`/movie/${id}`, {
      params: {
        api_key: key,
        language: 'pt-BR'
      }
    })
  }

  public async moviePlatform(id: number) {
    return await api.get(`/movie/${id}/watch/providers`, {
      params: {
        api_key: key,
        language: 'pt-BR',
        page: 1
      }
    })
  }
}

export default new MoviesApi()
