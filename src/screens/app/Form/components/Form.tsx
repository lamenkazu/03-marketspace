import {
  Center,
  CircleIcon,
  HStack,
  Icon,
  Pressable,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed'
import Plus from 'phosphor-react-native/src/icons/Plus'

import { FilterInfo } from '@/components/FilterInfo'
import { Input } from '@/components/Input'

import { Section } from './Section'

export const Form = () => {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Section
        title="Imagens"
        subtitle="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!"
      >
        <HStack h={100}>
          <Pressable bg="$gray500" h={100} w={100} borderRadius={6}>
            <Center flex={1}>
              <Icon as={Plus} h={1} w={1} size="xl" color="$gray400" />
            </Center>
          </Pressable>
        </HStack>
      </Section>

      <Section title="Sobre o produto">
        <Input placeholder="Título do anúncio" onChange={() => {}} />

        <Textarea
          mb={16}
          h={160}
          px={16}
          bg="$gray700"
          borderRadius={6}
          borderWidth={0}
          borderColor="transparent"
          $focus-borderColor="$bluelight"
        >
          <TextareaInput
            placeholder="Descrição do produto"
            fontFamily="$body"
          />
        </Textarea>

        <RadioGroup flexDirection="row" gap={20}>
          <Radio value="new" size="md" isInvalid={false} isDisabled={false}>
            <RadioIndicator mr="$2" borderWidth={1}>
              <RadioIcon as={CircleIcon} color="$bluelight" h={14} w={14} />
            </RadioIndicator>

            <RadioLabel>Produto novo</RadioLabel>
          </Radio>

          <Radio value="used" size="md" isInvalid={false} isDisabled={false}>
            <RadioIndicator h={20} w={20} mr={8} borderWidth={1}>
              <RadioIcon as={CircleIcon} color="$bluelight" h={14} w={14} />
            </RadioIndicator>

            <RadioLabel>Produto usado</RadioLabel>
          </Radio>
        </RadioGroup>
      </Section>

      <Section title="Venda">
        <Input placeholder="Valor do produto" prefix="R$" onChange={() => {}} />

        <FilterInfo />
      </Section>
    </ScrollView>
  )
}
