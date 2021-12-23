import React, { useEffect, useState } from 'react'

import { Container, PlatformList, Title } from './style'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RootStackParamsList } from '../../routes/RootStackParams'
import MoviesApi from '../../services/api/MoviesApi'
import { PlatformItem } from '../../components/PlatformItem'
import { ActivityIndicator } from 'react-native'

type PlatformProps = {
  logo_path: string
  provider_name: string
}

export const Platform: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamsList, 'Platform'>>()

  const [flatrate, setFlatrate] = useState<App.Platform | []>([])
  const [buy, setBuy] = useState<App.Platform | []>([])
  const [rent, setRent] = useState<App.Platform | []>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const getPlatform = async () => {
      if (route.params.id) {
        MoviesApi.moviePlatform(route.params.id)
          .then((res) => {
            res.data.results.BR.flatrate && setFlatrate(res.data.results.BR.flatrate)
            res.data.results.BR.buy && setBuy(res.data.results.BR.buy)
            res.data.results.BR.rent && setRent(res.data.results.BR.rent)
          })
          .catch((err) => err)
          .finally(() => setIsLoading(false))
      }
    }

    if (isActive) {
      getPlatform()
    }

    return () => {
      isActive = false
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    )
  }

  return (
    <Container>
      {flatrate.length !== 0 ? (
        <>
          <Title>Plataformas de stream</Title>
          <PlatformList
            data={flatrate}
            renderItem={({ item }: PlatformProps | any) => (
              <PlatformItem
                logo_path={item.logo_path}
                provider_name={item.provider_name}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
          />
        </>
      ) : (
        <Title style={{ textAlign: 'center' }}>Sem plataforma de stream</Title>
      )}
      {buy.length !== 0 ? (
        <>
          <Title>Comprar</Title>
          <PlatformList
            data={buy}
            renderItem={({ item }: PlatformProps | any) => (
              <PlatformItem
                logo_path={item.logo_path}
                provider_name={item.provider_name}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
          />
        </>
      ) : (
        <Title style={{ textAlign: 'center' }}>Sem opções para comprar</Title>
      )}
      {rent.length !== 0 ? (
        <>
          <Title>Alugar</Title>
          <PlatformList
            data={rent}
            renderItem={({ item }: PlatformProps | any) => (
              <PlatformItem
                logo_path={item.logo_path}
                provider_name={item.provider_name}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
          />
        </>
      ) : (
        <Title style={{ textAlign: 'center' }}>Sem opções para alugar</Title>
      )}
    </Container>
  )
}
