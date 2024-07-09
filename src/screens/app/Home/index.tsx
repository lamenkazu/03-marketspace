import { useStyled } from '@gluestack-style/react'
import { VStack } from '@gluestack-ui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BuyProducts } from './components/BuyProducts'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SelfProducts } from './components/SelfProducts'

export const Home = () => {
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
