import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'

import { ScrollView } from 'react-native'

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
import { api, key } from '../../services/api'
import { getListMovies } from '../../utils/movie'

export const Home: React.FC = () => {
  const [nowMovies, setNowMovies] = useState<App.Movies[]>([])
  const [popularMovies, setPopularMovies] = useState<App.Movies[]>([])
  const [topMovies, setTopMovies] = useState<App.Movies[]>([])

  useEffect(() => {
    const isActive = true

    const getMovies = async () => {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1
          }
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1
          }
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1
          }
        })
      ])
      const nowList = getListMovies(10, nowData.data.results)
      const popularList = getListMovies(5, popularData.data.results)
      const topList = getListMovies(5, topData.data.results)
      setNowMovies(nowList)
      setPopularMovies(popularList)
      setTopMovies(topList)
    }

    getMovies()
  }, [])

  return (
    <Container>
      <Header title="Reactflix" />
      <SearchContainer>
        <Input placeholder="Ex Vingadores" placeholderTextColor="#ddd" />
        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em Cartaz</Title>
        <BannerButton activeOpacity={0.8} onPress={() => alert('Teste')}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80'
            }}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }: App.Movies | any) => <SliderItem data={item} />}
          keyExtractor={(item, index) => String(index)}
        />
        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }: App.Movies | any) => <SliderItem data={item} />}
          keyExtractor={(item, index) => String(index)}
        />
        <Title>Mais votados</Title>
        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }: App.Movies | any) => <SliderItem data={item} />}
          keyExtractor={(item, index) => String(index)}
        />
      </ScrollView>
    </Container>
  )
}
