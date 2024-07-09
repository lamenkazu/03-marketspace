import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ButtonGroup,
  ButtonIcon,
  ButtonSpinner,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import X from 'phosphor-react-native/src/icons/X'
import { useState } from 'react'

import { Button } from '@/components/Button'
import { FilterInfo } from '@/components/FilterInfo'
import { LabelTitle } from '@/components/LabelTitle'
import { Tag } from '@/components/Tag'

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

          <FilterInfo />

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
