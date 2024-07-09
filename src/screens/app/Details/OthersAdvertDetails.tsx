import { Box, HStack, Icon, VStack } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import WhatsappLogo from 'phosphor-react-native/src/icons/WhatsappLogo'
import { useCallback } from 'react'
import { BackHandler, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/Button'
import { PriceLabel } from '@/components/PriceLabel'
import { AppNavigationRoutesProp } from '@/routes/app.routes'
import { AdvertInfo } from '@/screens/app/Details/components/AdvertInfo'

export const OthersAdvertDetails = () => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const returnToHome = useCallback(() => {
    navigate('home')
  }, [navigate])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        returnToHome()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [returnToHome]),
  )

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
      }}
    >
      <VStack flex={1}>
        {/* Header */}
        <HStack px={24}>
          <TouchableOpacity onPress={returnToHome}>
            <Icon as={ArrowLeft} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>
        </HStack>

        {/* Advertising Info */}
        <AdvertInfo />

        {/* Footer */}
        <Box h={90} bg={'#fff'} justifyContent="center" px={24}>
          <HStack alignItems="center" justifyContent="space-between">
            <PriceLabel size={'$2xl'} />

            <Button
              ButtonIcon={WhatsappLogo}
              w={'60%'}
              bg={'$bluelight'}
              title="Entrar em contato"
            />
          </HStack>
        </Box>
      </VStack>
    </SafeAreaView>
  )
}
