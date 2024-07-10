import { View } from '@gluestack-ui/themed'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { Alert } from 'react-native'

import { useAuth } from '@/hooks/useAuth'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

export const SignOut = () => {
  const { signOut } = useAuth()
  const { goBack } = useNavigation<AppNavigationRoutesProp>()

  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        'Desconectar',
        'Ao continuar, você irá se desconectar da sua conta. \nTem certeza que quer fazer isso?',
        [
          {
            text: 'Vou ficar',
            onPress: () => goBack(),
            style: 'cancel',
          },
          { text: 'Vou sair', onPress: async () => signOut() },
        ],
      )
    }, [goBack, signOut]),
  )

  return <View />
}
