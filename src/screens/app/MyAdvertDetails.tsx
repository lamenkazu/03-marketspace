import { HStack, Icon, VStack } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import { useCallback } from 'react'
import { BackHandler, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AdvertInfo } from '@/components/AdvertInfo'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

export const MyAdvertDetails = () => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()

  const goToEdit = () => {
    navigate('edit', { id: '1' })
  }

  const returnToMyAdverts = useCallback(() => {
    navigate('my-adverts')
  }, [navigate])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        returnToMyAdverts()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [returnToMyAdverts]),
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
        <HStack px={24} justifyContent="space-between">
          <TouchableOpacity onPress={returnToMyAdverts}>
            <Icon as={ArrowLeft} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>

          <TouchableOpacity onPress={goToEdit}>
            <Icon as={PencilSimpleLine} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>
        </HStack>

        {/* Advertising Info */}
        <AdvertInfo isEdit />
      </VStack>
    </SafeAreaView>
  )
}
