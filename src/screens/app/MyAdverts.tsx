import {
  ChevronDownIcon,
  HStack,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import ArrowLeft from 'phosphor-react-native/src/icons/ArrowLeft'
import Plus from 'phosphor-react-native/src/icons/Plus'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AppNavigationRoutesProp } from '@/routes/app.routes'

import { AdvertList } from './Home/components/AdvertList'

export const MyAdverts = () => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const returnToHome = () => {
    navigate('home')
  }

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
      }}
    >
      <VStack flex={1} px={24}>
        {/* Header */}
        <HStack>
          <TouchableOpacity onPress={returnToHome}>
            <Icon as={ArrowLeft} h={1} w={1} size={'xl'} mb={16} />
          </TouchableOpacity>

          <Text>Meus anúncios</Text>

          <Icon as={Plus} />
        </HStack>

        {/*  */}
        <HStack>
          <Text>9 Alunos</Text>

          <Select flex={1}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select option" />
              <Icon as={ChevronDownIcon} mr="$3" />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="UX Research" value="ux" />
                <SelectItem label="Web Development" value="web" />
                <SelectItem
                  label="Cross Platform Development Process"
                  value="cross-platform"
                />
                <SelectItem label="UI Designing" value="ui" isDisabled={true} />
                <SelectItem label="Backend Development" value="backend" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>

        <AdvertList condition="self" />
      </VStack>
    </SafeAreaView>
  )
}
