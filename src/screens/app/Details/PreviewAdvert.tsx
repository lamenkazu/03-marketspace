import {
  Box,
  ButtonGroup,
  Center,
  SafeAreaView,
  Text,
  useStyled,
  VStack,
} from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import Tag from 'phosphor-react-native/src/icons/Tag'
import { useCallback } from 'react'
import { BackHandler, StatusBar } from 'react-native'

import { Button } from '@/components/Button'
import { useMarketspace } from '@/hooks/useMarketspace'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

import { AdvertInfo } from './components/AdvertInfo'

export const PreviewAdvert = () => {
  const styled = useStyled()
  const { colors } = styled.config.tokens

  const { navigate } = useNavigation<AppNavigationRoutesProp>()

  const { newProduct } = useMarketspace()

  const handleGoBackAndEdit = useCallback(() => {
    navigate('new')
  }, [navigate])

  useFocusEffect(
    useCallback(() => {
      // Define a cor da StatusBar quando a tela estiver em foco
      StatusBar.setBarStyle('dark-content')
      StatusBar.setBackgroundColor(colors.bluelight)

      // Define comportamento de voltar do android como o de cancelar do aplicativo
      const onBackPress = () => {
        handleGoBackAndEdit()
        return true
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        // Restaura a cor da StatusBar quando sair da tela
        StatusBar.setBarStyle('dark-content')
        StatusBar.setBackgroundColor(colors.gray600)

        // restaura padrão de comportamento de botão de voltar do android
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [colors.bluelight, colors.gray600, handleGoBackAndEdit]),
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
        <AdvertInfo product={newProduct} />

        {/* Footer */}
        <Box bg={'$gray700'} h={90} alignItems="center" justifyContent="center">
          <ButtonGroup px={24}>
            <Button
              onPress={handleGoBackAndEdit}
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
