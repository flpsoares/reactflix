import React from 'react'

import { Container, Title } from './style'

interface GenreProps {
  data: {
    name: string
  }
}

const Genre: React.FC<GenreProps> = ({ data }) => {
  return (
    <Container>
      <Title>{data.name}</Title>
    </Container>
  )
}

export default Genre
