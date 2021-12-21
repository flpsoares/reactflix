import React from 'react'

import { Container, BannerItem, Title, RateContainer, Rate } from './style'

import { Ionicons } from '@expo/vector-icons'

interface MovieProps {
  data: App.Movies
  navigatePage: (data: App.Movies) => void
}

export const SliderItem: React.FC<MovieProps> = ({ data, navigatePage }) => {
  return (
    <Container activeOpacity={0.7} onPress={() => navigatePage(data)}>
      <BannerItem
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`
        }}
      />
      <Title numberOfLines={1}>{data.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  )
}
