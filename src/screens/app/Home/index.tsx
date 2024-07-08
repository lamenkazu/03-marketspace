import { SafeAreaView } from 'react-native-safe-area-context'

import { BuyProducts } from './components/BuyProducts'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SelfProducts } from './components/SelfProducts'

export const Home = () => {
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 24,
        marginTop: 12,
        flex: 1,
      }}
    >
      <Header mb={32} />

      <Section mb={36} title="Seus produtos anunciados para venda">
        <SelfProducts />
      </Section>

      <Section title="Compre produtos variados">
        <BuyProducts />
      </Section>
    </SafeAreaView>
  )
}
