import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ButtonGroup,
  ButtonIcon,
  ButtonSpinner,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  HStack,
  Pressable,
  Switch,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import X from 'phosphor-react-native/src/icons/X'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { Tag } from '@/components/Tag'

import { LabelTitle } from '../../../../components/LabelTitle'

interface ContitionProps {
  new: boolean
  used: boolean
}

interface FilterProps {
  showActionsheet: boolean
  toggleFilterVisibility: () => void
  isLoading: boolean
}

export const Filter = ({
  toggleFilterVisibility,
  showActionsheet,
  isLoading,
}: FilterProps) => {
  const [condition, setCondition] = useState<ContitionProps>({
    new: false,
    used: false,
  })

  const paymentData = [
    'Boleto',
    'Pix',
    'Dinheiro',
    'Cartão de Crédito',
    'Depósito Bancário',
  ]

  const handleConditionFilter = (filter: 'new' | 'used') => {
    switch (filter) {
      case 'new':
        setCondition((prevState) => {
          return {
            ...prevState,
            new: !prevState.new,
          }
        })
        break
      case 'used':
        setCondition((prevState) => {
          return {
            ...prevState,
            used: !prevState.used,
          }
        })
        break
      default:
        break
    }
  }

  return (
    <Actionsheet
      isOpen={showActionsheet}
      onClose={toggleFilterVisibility}
      zIndex={999}
    >
      <ActionsheetBackdrop />

      <ActionsheetContent h="$72" zIndex={999}>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <VStack w={'$full'} px={24}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontFamily={'$heading'} fontSize={'$xl'}>
              Filtrar anúncios
            </Text>
            <Pressable onPress={toggleFilterVisibility}>
              {isLoading ? (
                <ButtonIcon
                  as={X}
                  size={'xl'}
                  color={'$gray400'}
                  h={24}
                  w={24}
                />
              ) : (
                <ButtonSpinner />
              )}
            </Pressable>
          </HStack>

          <VStack>
            <LabelTitle>Condição</LabelTitle>
            <HStack gap={8}>
              <Pressable onPress={() => handleConditionFilter('new')}>
                <Tag
                  title="Novo"
                  w={76}
                  h={28}
                  textSize={12}
                  isFilter
                  isSelected={condition.new}
                />
              </Pressable>

              <Pressable onPress={() => handleConditionFilter('used')}>
                <Tag
                  title="Usado"
                  w={76}
                  h={28}
                  textSize={12}
                  isFilter
                  isSelected={condition.used}
                />
              </Pressable>
            </HStack>
          </VStack>

          <VStack>
            <LabelTitle>Aceita troca?</LabelTitle>
            <Switch size="lg" mt={-10} alignSelf="flex-start" />
          </VStack>

          <VStack>
            <LabelTitle>Meios de pagamento aceitos</LabelTitle>
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

          <ButtonGroup mt={50} mb={32}>
            <Button
              title="Resetar filtros"
              bg="$gray500"
              color={'$gray200'}
              w={'50%'}
              px={0}
            />
            <Button bg="$gray100" title="Aplicar filtros" w={'50%'} px={0} />
          </ButtonGroup>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  )
}
