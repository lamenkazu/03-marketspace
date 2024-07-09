import {
  Box,
  ButtonGroup,
  Center,
  SafeAreaView,
  Text,
  useStyled,
  VStack,
} from '@gluestack-ui/themed'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import Tag from 'phosphor-react-native/src/icons/Tag'
import { StatusBar } from 'react-native'

import { Button } from '@/components/Button'

import { AdvertInfo } from './components/AdvertInfo'

export const PreviewAdvert = () => {
  const styled = useStyled()
  const { colors } = styled.config.tokens

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.bluelight}
        translucent
      />
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
