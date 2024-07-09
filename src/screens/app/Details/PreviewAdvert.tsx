import {
  Box,
  ButtonGroup,
  Center,
  SafeAreaView,
  Text,
  useStyled,
  VStack,
} from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import Tag from 'phosphor-react-native/src/icons/Tag'
import { useCallback } from 'react'
import { StatusBar } from 'react-native'

import { Button } from '@/components/Button'

import { AdvertInfo } from './components/AdvertInfo'

export const PreviewAdvert = () => {
  const styled = useStyled()
  const { colors } = styled.config.tokens

  useFocusEffect(
    useCallback(() => {
      // Defina a cor da StatusBar quando a tela estiver em foco
      StatusBar.setBarStyle('dark-content')
      StatusBar.setBackgroundColor(colors.bluelight)

      // Restaure a cor da StatusBar quando sair da tela
      return () => {
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor(colors.gray600)
      }
    }, [colors.bluelight, colors.gray600]),
  )

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <VStack flex={1}>
        {/* Header */}
        <Center h={120} bg={'$bluelight'} px={24}>
          <Text fontFamily="$heading" color={'$gray700'}>
            Pré visualização do anúncio
          </Text>
          <Text fontSize="$sm" color={'$gray700'}>
            É assim que seu produto vai aparecer!
          </Text>
        </Center>

        {/* Advertising Info */}
        <AdvertInfo />

        {/* Footer */}
        <Box bg={'$gray700'} h={90} alignItems="center" justifyContent="center">
          <ButtonGroup px={24}>
            <Button
              ButtonIcon={ArrowLeft}
              title="Voltar e editar"
              bg="$gray500"
              color={'$gray200'}
              w={'50%'}
              px={0}
            />
            <Button ButtonIcon={Tag} title="Publicar" w={'50%'} px={0} />
          </ButtonGroup>
        </Box>
      </VStack>
    </SafeAreaView>
  )
}
