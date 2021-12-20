export const getListMovies = (size: number, movies: any) => {
  const popularMovies = []
  let i = 0

  for (let l = size; i < l; i++) {
    popularMovies.push(movies[i])
  }

  return popularMovies
}
