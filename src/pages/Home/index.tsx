import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'

import { ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamsList } from '../../routes/RootStackParams'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Feather } from '@expo/vector-icons'

import {
  Container,
  SearchContainer,
  SearchButton,
  Input,
  Title,
  BannerButton,
  Banner,
  SliderMovie
} from './style'
import { SliderItem } from '../../components/SliderItem'
import { getListMovies, randomBanner } from '../../utils/movie'
import MoviesApi from '../../services/api/MoviesApi'

type DetailScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>

export const Home: React.FC = () => {
  const [nowMovies, setNowMovies] = useState<App.Movies[]>([])
  const [popularMovies, setPopularMovies] = useState<App.Movies[]>([])
  const [topMovies, setTopMovies] = useState<App.Movies[]>([])
  const [bannerMovie, setBannerMovie] = useState<App.Movies>()
  const [input, setInput] = useState('')

  const [loading, setLoading] = useState(true)

  const navigation = useNavigation<DetailScreenProps>()

  useEffect(() => {
    let isActive = true
    const ac = new AbortController()

    const getMovies = async () => {
      const [nowData, popularData, topData] = await Promise.all([
        MoviesApi.moviesInTheaters(),
        MoviesApi.popularMovies(),
        MoviesApi.topRatedMovies()
      ])

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results)
        const popularList = getListMovies(5, popularData.data.results)
        const topList = getListMovies(5, topData.data.results)

        setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])

        setNowMovies(nowList)
        setPopularMovies(popularList)
        setTopMovies(topList)

        setLoading(false)
      }
    }

    getMovies()

    return () => {
      isActive = false
      ac.abort() // cancela as ações da página (req)
    }
  }, [])

  const navigateDetailsPage = (movie: App.Movies) => {
    navigation.navigate('Detail', {
      id: movie.id
    })
  }

  const handleSearchMovie = () => {
    if (input === '') return
    navigation.navigate('Search', { name: input })
    setInput('')
  }

  if (loading) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    )
  }

  return (
    <Container>
      <Header title="Reactfilm" />
      <SearchContainer>
        <Input
          placeholder="Pesquisar"
          placeholderTextColor="#ddd"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearchMovie}>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>
        <BannerButton
          activeOpacity={0.8}
          onPress={() => (bannerMovie ? navigateDetailsPage(bannerMovie) : null)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerMovie?.poster_path}`
            }}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }: App.Movies | any) => (
            <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />
          )}
          keyExtractor={(item, index) => String(index)}
        />
        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }: App.Movies | any) => (
            <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />
          )}
          keyExtractor={(item, index) => String(index)}
        />
        <Title>Mais votados</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }: App.Movies | any) => (
            <SliderItem data={item} navigatePage={() => navigateDetailsPage(item)} />
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </ScrollView>
    </Container>
  )
}
