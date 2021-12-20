import React from 'react'
import { Header } from '../../components/Header'

import { Feather } from '@expo/vector-icons'

import { Container, SearchContainer, SearchButton, Input } from './style'

export const Home: React.FC = () => {
  return (
    <Container>
      <Header title="Reactflix" />
      <SearchContainer>
        <Input placeholder="Ex Vingadores" placeholderTextColor="#ddd" />
        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
    </Container>
  )
}
