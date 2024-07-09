import {
  ButtonSpinner,
  Divider,
  Icon,
  Input,
  InputField,
  InputIcon,
  Pressable,
} from '@gluestack-ui/themed'
import MagnifyingGlass from 'phosphor-react-native/src/icons/MagnifyingGlass'
import Sliders from 'phosphor-react-native/src/icons/Sliders'
import { ComponentProps, useState } from 'react'

import { Filter } from './Filter'

interface SearchAdvertProps extends ComponentProps<typeof Input> {}

/** Algumas propriedades apresentam erro de tipagem,
 *  mas funcionam corretamente na UI.
 * Problema com Gluestack Types */

export const SearchAdvert = ({ ...props }: SearchAdvertProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showActionsheet, setShowActionsheet] = useState(false)
  const toggleFilterVisibility = () => {
    setIsLoading(!isLoading)
    setShowActionsheet(!showActionsheet)
  }

  return (
    <Input
      w={'$full'}
      h={45}
      mb={24}
      borderRadius={6}
      bg={'$gray700'}
      borderWidth={0}
      px={18}
      alignItems="center"
      {...props}
    >
      <InputField
        placeholder="Buscar anúncio"
        placeholderTextColor={'$gray400'}
        fontFamily="$body"
        selectionColor={'#647AC766'}
        flex={1}
      />

      <Pressable
        py={10}
        px={5}
        mr={0}
        onPress={() => console.log('search')}
        $active-opacity={0.8}
      >
        <InputIcon size={'lg'}>
          <Icon as={MagnifyingGlass} weight={'bold'} size={'lg'} />
        </InputIcon>
      </Pressable>

      <Divider orientation="vertical" mx="$1.5" bg="$gray400" h={16} />

      <Pressable
        py={10}
        px={5}
        onPress={toggleFilterVisibility}
        $active-opacity={0.8}
      >
        <InputIcon size="lg">
          {isLoading ? (
            <ButtonSpinner color={'$bluelight'} />
          ) : (
            <Icon as={Sliders} weight={'bold'} size={'lg'} />
          )}
        </InputIcon>
      </Pressable>

      <Filter
        isLoading
        toggleFilterVisibility={toggleFilterVisibility}
        showActionsheet={showActionsheet}
      />
    </Input>
  )
}
