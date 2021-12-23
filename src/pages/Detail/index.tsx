import React, { useEffect, useState } from 'react'

import {
  Container,
  Title,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  ContentArea,
  ListGenres,
  Rate,
  Description,
  WhereWhatch,
  WhereWhatchTitle,
  WhereWatchContainer
} from './style'
import { Feather, Ionicons } from '@expo/vector-icons'

import { ScrollView, Modal } from 'react-native'

// @ts-ignore
import Stars from 'react-native-stars'
import Genre from '../../components/Genre'
import { ModalLink } from '../../components/ModalLink'
import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamsList } from '../../routes/RootStackParams'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import MoviesApi from '../../services/api/MoviesApi'

type PlatformScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Detail'>

export const Detail: React.FC = () => {
  const navigation = useNavigation<PlatformScreenProps>()
  const route = useRoute<RouteProp<RootStackParamsList, 'Detail'>>()

  const [movie, setMovie] = useState<App.Movies>({})
  const [openLink, setOpenLink] = useState(false)
  const [isFavoriteMovie, setIsFavoriteMovie] = useState(false)

  const navigateToPlatforms = () => {
    navigation.navigate('Platform', { id: movie.id })
  }

  const favoriteMovie = async (movie: App.Movies) => {
    if (isFavoriteMovie) {
      if (movie.id) {
        deleteMovie(movie.id)
        setIsFavoriteMovie(false)
      }
    } else {
      await saveMovie('@reactflix', movie)
      setIsFavoriteMovie(true)
    }
  }

  useEffect(() => {
    let isActive = true
    const ac = new AbortController()

    const getMovie = async () => {
      if (route.params.id) {
        MoviesApi.detailedFilm(route.params.id)
          .then(async (res) => {
            if (isActive) {
              setMovie(res.data)

              const isFavorite = await hasMovie(res.data)
              setIsFavoriteMovie(isFavorite)
            }
          })
          .catch((err) => console.log(err))
      }
    }

    if (isActive) {
      getMovie()
    }

    return () => {
      isActive = false
      ac.abort()
    }
  }, [])

  return (
    <Container>
      <Header>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>
        <HeaderButton onPress={() => favoriteMovie(movie)}>
          {isFavoriteMovie ? (
            <Ionicons name="bookmark" size={28} color="#fff" />
          ) : (
            <Ionicons name="bookmark-outline" size={28} color="#fff" />
          )}
        </HeaderButton>
      </Header>
      <Banner
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }}
      />
      <ButtonLink onPress={() => setOpenLink(true)}>
        <Feather name="link" size={24} color="#fff" />
      </ButtonLink>
      <Title numberOfLines={2}>{movie.title}</Title>
      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74e" />}
          emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74e" />}
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        renderItem={({ item }: App.Movies | any) => <Genre data={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
      />
      <WhereWatchContainer>
        <WhereWhatch onPress={navigateToPlatforms}>
          <WhereWhatchTitle>Onde assistir</WhereWhatchTitle>
        </WhereWhatch>
      </WhereWatchContainer>
      <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie.overview}</Description>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie.homepage}
          title={movie.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  )
}
