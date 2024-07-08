import { SafeAreaView } from 'react-native-safe-area-context'

import { BuyProducts } from './components/BuyProducts'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SelfProducts } from './components/SelfProducts'

export const Home = () => {
  return (
    <SafeAreaView style={{ paddingHorizontal: 24, marginTop: 12 }}>
      <Header />

      <Section title="Seus produtos anunciados para venda">
        <SelfProducts />
      </Section>

      <Section title="Compre produtos variados">
        <BuyProducts />
      </Section>
    </SafeAreaView>
  )
}
