import React from 'react'

import { Container, MenuButton, Title } from './style'
import { Feather } from '@expo/vector-icons'

import { useNavigation, DrawerActions } from '@react-navigation/native'

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation()

  return (
    <Container>
      <MenuButton onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Feather name="menu" size={36} color="#FFF" />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  )
}
