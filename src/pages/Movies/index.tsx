import React, { useEffect, useState } from 'react'
import { FavoriteItem } from '../../components/FavoriteItem'
import { Header } from '../../components/Header'
import { deleteMovie, getSavedMovies } from '../../utils/storage'

import { useNavigation, useIsFocused } from '@react-navigation/native'

import { Container, ListMovies } from './style'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamsList } from '../../routes/RootStackParams'

type DetailScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Movies'>

export const Movies: React.FC = () => {
  const navigation = useNavigation<DetailScreenProps>()
  const isFocused = useIsFocused()

  const [movies, setMovies] = useState<App.Movies[]>()

  const handleDelete = async (id: number) => {
    const result = await deleteMovie(id)
    setMovies(result)
  }

  const navigateDetailPage = (movie: App.Movies) => {
    navigation.navigate('Detail', { id: movie.id })
  }

  useEffect(() => {
    let isActive = true

    const getFavoriteMovies = async () => {
      const result = await getSavedMovies('@reactflix')

      if (isActive) {
        setMovies(result)
      }
    }

    if (isActive) {
      getFavoriteMovies()
    }

    return () => {
      isActive = false
    }
  }, [isFocused])

  return (
    <Container>
      <Header title="Meus filmes" />
      <ListMovies
        data={movies}
        renderItem={({ item }: App.Movies | any) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={navigateDetailPage}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
      />
    </Container>
  )
}
