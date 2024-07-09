import { useStyled, VStack } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ActionsButtonGorup } from './components/ActionsButtonGroup'
import { Form } from './components/Form'
import { Header } from './components/Header'

export const NewAdvert = () => {
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
      <VStack flex={1} px={24}>
        <Header title="Criar anúncio" />

        <Form />
      </VStack>

      <ActionsButtonGorup />
    </SafeAreaView>
  )
}
