/* eslint-disable camelcase */
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { GluestackUIProvider, Spinner } from '@gluestack-ui/themed'
import { StatusBar } from 'react-native'

import { Routes } from '@/routes'
import { THEME } from '@/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  })

  return (
    <GluestackUIProvider config={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={THEME.tokens.colors.gray600}
        translucent
      />

      {fontsLoaded ? (
        <Routes />
      ) : (
        <Spinner bg={'$gray600'} flex={1} color={'$bluelight'} />
      )}
    </GluestackUIProvider>
  )
}
