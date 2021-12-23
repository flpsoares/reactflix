import React from 'react'

import { Container, Title, Image } from './style'

type PlatformProps = {
  logo_path?: string
  provider_name?: string
}

export const PlatformItem: React.FC<PlatformProps> = ({
  logo_path,
  provider_name
}) => {
  return (
    <Container>
      <Image source={{ uri: `https://image.tmdb.org/t/p/original/${logo_path}` }} />
      <Title>{provider_name}</Title>
    </Container>
  )
}
