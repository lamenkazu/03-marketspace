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

export const SearchAdvert = ({ ...props }: SearchAdvertProps) => {
  return (
    <Input
      w={'$full'}
      h={45}
      pr={16}
      mb={24}
      borderRadius={6}
      bg={'$gray700'}
      borderWidth={0}
      alignItems="center"
      {...props}
    >
      <InputField flex={1} />

      <InputSlot onPress={() => console.log('search')} $active-opacity={0.8}>
        <InputIcon>
          <Icon as={MagnifyingGlass} weight={'bold'} />
        </InputIcon>
      </InputSlot>

      <Divider orientation="vertical" mx="$2.5" bg="$gray400" h={16} />

      <InputSlot onPress={() => console.log('filter')} $active-opacity={0.8}>
        <InputIcon>
          <Icon weight={'bold'} as={Sliders} />
        </InputIcon>
      </InputSlot>
    </Input>
  )
}
