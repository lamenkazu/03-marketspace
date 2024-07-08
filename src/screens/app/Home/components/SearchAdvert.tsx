import {
  Divider,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from '@gluestack-ui/themed'
import MagnifyingGlass from 'phosphor-react-native/src/icons/MagnifyingGlass'
import Sliders from 'phosphor-react-native/src/icons/Sliders'
import { ComponentProps } from 'react'

interface SearchAdvertProps extends ComponentProps<typeof Input> {}

/** Algumas propriedaes apresentam erro de tipagem, mas funcionam corretamente na UI. Problema com Gluestack */

export const SearchAdvert = ({ ...props }: SearchAdvertProps) => {
  return (
    <Input
      w={'$full'}
      h={45}
      mb={24}
      borderRadius={6}
      bg={'$gray700'}
      borderWidth={0}
      alignItems="center"
      {...props}
    >
      <InputField selectionColor={'#647AC766'} flex={1} />

      <InputSlot
        py={10}
        px={5}
        mr={0}
        onPress={() => console.log('search')}
        $active-opacity={0.8}
      >
        <InputIcon size={'lg'}>
          <Icon as={MagnifyingGlass} weight={'bold'} size={'lg'} />
        </InputIcon>
      </InputSlot>

      <Divider orientation="vertical" mx="$2.5" bg="$gray400" h={16} />

      <InputSlot
        py={10}
        px={5}
        onPress={() => console.log('filter')}
        $active-opacity={0.8}
      >
        <InputIcon size="lg">
          <Icon as={Sliders} weight={'bold'} size={'lg'} />
        </InputIcon>
      </InputSlot>
    </Input>
  )
}
