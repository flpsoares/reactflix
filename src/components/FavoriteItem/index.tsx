import React from 'react'

import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailButton,
  DeleteButton
} from './style'
import { Ionicons, Feather } from '@expo/vector-icons'

interface FavoriteItemProps {
  data: App.Movies
  deleteMovie: (id: number) => void
  navigatePage: (data: App.Movies) => void
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({
  data,
  deleteMovie,
  navigatePage
}) => {
  return (
    <Container>
      <Title size={22}>{data.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>
      <ActionContainer>
        <DetailButton onPress={() => navigatePage(data)}>
          <Title size={14}>Ver detalhes</Title>
        </DetailButton>
        <DeleteButton onPress={() => (data.id ? deleteMovie(data.id) : null)}>
          <Feather name="trash" size={24} color="#fff" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  )
}
