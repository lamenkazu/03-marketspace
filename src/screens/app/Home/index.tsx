import { Center } from '@gluestack-ui/themed'

import { BuyProducts } from './components/BuyProducts'
import { Header } from './components/Header'
import { Section } from './components/Section'
import { SelfProducts } from './components/SelfProducts'

export const Home = () => {
  return (
    <Center flex={1}>
      <Header />

      <Section title="Seus produtos anunciados para venda">
        <SelfProducts />
      </Section>

      <Section title="Compre produtos variados">
        <BuyProducts />
      </Section>
    </Center>
  )
}
