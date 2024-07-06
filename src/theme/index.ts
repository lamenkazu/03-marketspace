/* eslint-disable camelcase */
// import { Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla'
import { config } from '@gluestack-ui/config'

export const THEME = {
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      blue: '#364D9D',
      bluelight: '#647AC7',
      redlight: '#EE7979',
      gray100: '#1A181B',
      gray200: '#3E3A40',
      gray300: '#5F5B62',
      gray400: '#9F9BA1',
      gray500: '#D9D8DA',
      gray600: '#EDECEE',
      gray700: '#F7F7F8',
    },
    fonts: {
      heading: 'Karla_700Bold',
      body: 'Karla_400Regular',
    },
    fontSizes: {
      ...config.tokens.fontSizes,
    } as const,
  },
}
