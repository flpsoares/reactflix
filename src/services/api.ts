import axios from 'axios'

export const key = '5eb17f37da571bb0040ec427fa492785'

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})
