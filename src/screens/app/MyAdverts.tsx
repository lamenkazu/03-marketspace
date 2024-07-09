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
  useStyled,
  View,
  VStack,
} from '@gluestack-ui/themed'
import { useNavigation } from '@react-navigation/native'
import Plus from 'phosphor-react-native/src/icons/Plus'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AdvertList } from '@/components/AdvertList'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

export const MyAdverts = () => {
  const { navigate } = useNavigation<AppNavigationRoutesProp>()
  const handleGoToNewAdvert = () => {
    navigate('new')
  }

  // Select
  const [selectedValue, setSelectedValue] = useState('all')
  useEffect(() => {
    console.log(selectedValue)
  }, [selectedValue])

  const styled = useStyled()
  const { colors } = styled.config.tokens

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <VStack flex={1} px={24}>
        {/* Header */}
        <HStack justifyContent="space-between" mb={36}>
          <View />

          <Text fontFamily="$heading" fontSize="$xl">
            Meus anúncios
          </Text>

          <TouchableOpacity onPress={handleGoToNewAdvert}>
            <Icon as={Plus} h={1} w={1} size={'xl'} />
          </TouchableOpacity>
        </HStack>

        {/*  */}
        <HStack justifyContent="space-between" alignItems="center" mb={20}>
          <Text fontSize="$sm">9 anúncios</Text>

          <Select
            w={120}
            initialLabel="Todos"
            defaultValue="all"
            onValueChange={(value) => setSelectedValue(value)}
          >
            <SelectTrigger variant="outline" size="md">
              <SelectInput />
              <Icon as={ChevronDownIcon} mr="$3" />
            </SelectTrigger>

            <SelectPortal>
              <SelectBackdrop />

              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>

                <SelectItem label="Todos" value="all" />

                <SelectItem label="Ativos" value="active" />

                <SelectItem label="Inativos" value="unactive" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </HStack>

        <AdvertList condition="self" />
      </VStack>
    </SafeAreaView>
  )
}
