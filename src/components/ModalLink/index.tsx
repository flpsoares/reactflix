import React from 'react'

import { Name, BackButton } from './style'
import { Feather } from '@expo/vector-icons'

import { WebView } from 'react-native-webview'

interface ModalLinkProps {
  link: string | any
  title: string | undefined
  closeModal: () => void
}

export const ModalLink: React.FC<ModalLinkProps> = ({ link, title, closeModal }) => {
  return (
    <>
      <BackButton onPress={closeModal}>
        <Name numberOfLines={1}>{title}</Name>
        <Feather name="x" size={35} color="#fff" />
      </BackButton>
      <WebView source={{ uri: link }} />
    </>
  )
}
