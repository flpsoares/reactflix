declare namespace App {
  export interface Movies extends App.Model {
    poster_path?: string
    title?: string
    vote_average?: number
    genres?: [
      {
        id: number
        name: string
      }
    ]
    overview?: string
    homepage?: string
  }
}
