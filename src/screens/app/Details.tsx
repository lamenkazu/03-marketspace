import { Box, HStack, VStack } from '@gluestack-ui/themed'
import WhatsappLogo from 'phosphor-react-native/src/icons/WhatsappLogo'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AdvertInfo } from '@/components/AdvertInfo'
import { Button } from '@/components/Button'
import { PriceLabel } from '@/components/PriceLabel'

export const Details = () => {
  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
      }}
    >
      <VStack flex={1}>
        <AdvertInfo />

        {/* Footer */}
        <Box h={90} bg={'#fff'} justifyContent="center" px={24}>
          <HStack alignItems="center" justifyContent="space-between">
            <PriceLabel size={'$2xl'} />

            <Button
              ButtonIcon={WhatsappLogo}
              w={'60%'}
              bg={'$bluelight'}
              title="Entrar em contato"
            />
          </HStack>
        </Box>
      </VStack>
    </SafeAreaView>
  )
}
