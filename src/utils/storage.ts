import AsyncStorage from '@react-native-async-storage/async-storage'

export const getSavedMovies = async (key: string) => {
  const myMovies = await AsyncStorage.getItem(key)

  const savedMovies = myMovies ? JSON.parse(myMovies) : []
  return savedMovies
}

export const saveMovie = async (key: string, newMovie: App.Movies) => {
  const moviesStored: Array<App.Movies> = await getSavedMovies(key)

  const hasMovie = moviesStored.some((item) => item.id === newMovie.id)

  if (hasMovie) {
    return
  }

  moviesStored.push(newMovie)

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored))
}

export const deleteMovie = async (id: number) => {
  const moviesStored: Array<App.Movies> = await getSavedMovies('@reactflix')

  const myMovies = moviesStored.filter((item) => {
    return item.id !== id
  })

  await AsyncStorage.setItem('@reactflix', JSON.stringify(myMovies))
  return myMovies
}

export const hasMovie = async (movie: App.Movies) => {
  const moviesStored: Array<App.Movies> = await getSavedMovies('@reactflix')

  const hasMovie = moviesStored.find((item) => item.id === movie.id)

  if (hasMovie) {
    return true
  }

  return false
}
