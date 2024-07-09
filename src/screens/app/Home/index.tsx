import { useStyled } from '@gluestack-style/react'
import { VStack } from '@gluestack-ui/themed'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { Alert, BackHandler } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BuyProducts } from './components/BuyProducts'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SelfProducts } from './components/SelfProducts'

export const Home = () => {
  const styled = useStyled()
  const { colors } = styled.config.tokens

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Não vá', 'quer mesmo me deixar?', [
          {
            text: 'Vou ficar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Vou sair', onPress: () => BackHandler.exitApp() },
        ])
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, []),
  )

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <VStack flex={1} px={24}>
        <Header mb={32} />

        <Section mb={36} title="Seus produtos anunciados para venda">
          <SelfProducts />
        </Section>

        <Section flex={1} title="Compre produtos variados">
          <BuyProducts />
        </Section>
      </VStack>
    </SafeAreaView>
  )
}
