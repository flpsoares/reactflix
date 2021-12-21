import React from 'react'
import { Container, Title, Banner, RateContainer, Rate } from './style'
import { Ionicons } from '@expo/vector-icons'

interface SearchItemProps {
  data: App.Movies
  navigatePage: (data: App.Movies) => void
}

export const SearchItem: React.FC<SearchItemProps> = ({ data, navigatePage }) => {
  const detailMovie = () => {
    if (data.release_date === '') {
      return alert('Filme ainda sem data')
    }
    navigatePage(data)
  }

  return (
    <Container activeOpacity={0.7} onPress={detailMovie}>
      {data.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{ uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}` }}
        />
      ) : (
        <Banner resizeMethod="resize" source={require('../../assets/semfoto.png')} />
      )}
      <Title>{data.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  )
}
