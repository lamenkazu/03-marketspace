/* eslint-disable camelcase */
import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from '@expo-google-fonts/karla'
import { Center, GluestackUIProvider, Text } from '@gluestack-ui/themed'
import { StatusBar, View } from 'react-native'

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
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? (
        <Center bg="$black" flex={1}>
          <Text color="$blue">Hello World!</Text>
          <Text color="$bluelight">Hello World!</Text>
          <Text color="$redlight">Hello World!</Text>
          <Text color="$gray100">Hello World!</Text>
          <Text color="$gray200">Hello World!</Text>
          <Text color="$gray300">Hello World!</Text>
          <Text color="$gray400">Hello World!</Text>
          <Text color="$gray500">Hello World!</Text>
          <Text color="$gray600" fontFamily="$body">
            Hello World!
          </Text>
          <Text color="$gray700" fontFamily="$heading">
            Hello World!
          </Text>
        </Center>
      ) : (
        <View />
      )}
    </GluestackUIProvider>
  )
}
