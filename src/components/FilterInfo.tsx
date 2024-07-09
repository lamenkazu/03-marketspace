import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  Switch,
  VStack,
} from '@gluestack-ui/themed'

import { LabelTitle } from './LabelTitle'

export const FilterInfo = () => {
  const paymentData = [
    'Boleto',
    'Pix',
    'Dinheiro',
    'Cartão de Crédito',
    'Depósito Bancário',
  ]
  return (
    <>
      <VStack>
        <LabelTitle mt={16}>Aceita troca?</LabelTitle>
        <Switch
          trackColor={{ true: '$bluelight', false: '$gray500' }}
          size="lg"
          mt={-10}
          alignSelf="flex-start"
        />
      </VStack>

      <VStack>
        <LabelTitle mt={16}>Meios de pagamento aceitos</LabelTitle>
        {paymentData.map((item) => (
          <Checkbox
            key={item}
            mb={14}
            value="uai"
            size="md"
            aria-label="Checkbox para selecionar meios de pagamento aceitos"
          >
            <CheckboxIndicator
              h={18}
              w={18}
              mr="$2"
              $checked-borderWidth={0}
              $checked-bg="$bluelight"
            >
              <CheckboxIcon
                as={CheckIcon}
                color={'$gray700'}
                size="2xs"
                h={13}
                w={13}
              />
            </CheckboxIndicator>
            <CheckboxLabel fontFamily="$body" fontSize={'$md'}>
              {item}
            </CheckboxLabel>
          </Checkbox>
        ))}
      </VStack>
    </>
  )
}
