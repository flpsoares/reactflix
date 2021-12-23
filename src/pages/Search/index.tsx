import React, { useEffect, useState } from 'react'

import { Container, ListMovies } from './style'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { api, key } from '../../services/api'
import { RootStackParamsList } from '../../routes/RootStackParams'
import { SearchItem } from '../../components/SearchItem'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import MoviesApi from '../../services/api/MoviesApi'

type DetailScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Search'>

export const Search: React.FC = () => {
  const navigation = useNavigation<DetailScreenProps>()
  const route = useRoute<RouteProp<RootStackParamsList, 'Search'>>()

  const [movie, setMovie] = useState<App.Movies[]>([])
  const [loading, setLoading] = useState(true)

  const navigateDetailsPage = (movie: App.Movies) => {
    navigation.navigate('Detail', {
      id: movie.id
    })
  }

  useEffect(() => {
    let isActive = true

    const getSearchMovie = async () => {
      await MoviesApi.searchMovie(route.params.name).then((res) => {
        if (isActive) {
          setMovie(res.data.results)
          setLoading(false)
        }
      })
    }

    getSearchMovie()

    return () => {
      isActive = false
    }
  }, [])

  if (loading) {
    return <Container></Container>
  }

  return (
    <Container>
      <ListMovies
        data={movie}
        renderItem={({ item }: App.Movies | any) => (
          <SearchItem data={item} navigatePage={() => navigateDetailsPage(item)} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
      />
    </Container>
  )
}
