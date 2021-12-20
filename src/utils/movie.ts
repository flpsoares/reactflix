// Gerar uma lista de filmes com tamanho que eu desejar
export const getListMovies = (size: number, movies: any) => {
  const popularMovies = []
  let i = 0

  for (let l = size; i < l; i++) {
    popularMovies.push(movies[i])
  }

  return popularMovies
}

// Gerar um número aleatório com base no tamanho da lista de filmes que eu passar
export const randomBanner = (movies: any) => {
  return Math.floor(Math.random() * movies.length)
}
