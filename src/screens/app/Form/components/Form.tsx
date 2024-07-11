import {
  AlertCircleIcon,
  Box,
  Center,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  CircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  HStack,
  Icon,
  Image,
  Pressable,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  ScrollView,
  Switch,
  Textarea,
  TextareaInput,
  useToast,
  VStack,
} from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import Plus from 'phosphor-react-native/src/icons/Plus'
import X from 'phosphor-react-native/src/icons/X'
import { useState } from 'react'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/Input'
import { LabelTitle } from '@/components/LabelTitle'
import { Toast } from '@/components/Toast'
import { ProductImagesProps } from '@/dtos/MarketspaceDTO'

import { Section } from './Section'

export const formSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório').min(3, 'Nome muito curto.'),
  description: z
    .string()
    .min(1, 'Descrição do protudo é obrigatório')
    .min(7, 'A descrição deve ser maior.'),
  isNew: z.boolean(),
  price: z
    .string()
    .min(1, 'Necessário um valor')
    .refine(
      (value) => {
        const parsedValue = parseFloat(value.replace(',', '.'))
        return !isNaN(parsedValue) && parsedValue >= 0
      },
      {
        message: 'Necessário um valor',
      },
    ),
  acceptTrade: z.boolean(),
  paymentMethods: z
    .array(z.string())
    .min(1, 'Selecione ao menos um meio de pagamento.'),
  productPhotos: z
    .array(z.object({ uri: z.string(), name: z.string(), type: z.string() }))
    .min(1, 'Selecione ao menos uma imagem.'),
})
export type FormSchema = z.infer<typeof formSchema>

interface FormProps {
  control: Control<FormSchema, unknown>
  errors: FieldErrors<FormSchema>
  setValue: UseFormSetValue<FormSchema>
  trigger: UseFormTrigger<FormSchema>
}

export const Form = ({ control, errors, setValue, trigger }: FormProps) => {
  const toast = useToast()

  const paymentData = [
    { label: 'Boleto', value: 'boleto' },
    { label: 'Pix', value: 'pix' },
    { label: 'Dinheiro', value: 'cash' },
    { label: 'Cartão de Crédito', value: 'card' },
    { label: 'Depósito Bancário', value: 'deposit' },
  ]

  // Images
  const [productPhotos, setproductPhotos] = useState<ProductImagesProps>(
    [] as ProductImagesProps,
  )
  const handleImagesSelection = async () => {
    try {
      const selectedPhotos = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // tipo de conteudo que quer selecionar da galeria do usuario
        quality: 1, // qualidade da imagem vai de 0 a 1
        aspect: [4, 4], // Aspecto da imagem. No caso, 4 por 4 é uma imagem quadrada, poderia ser 3/4 e dai em diante.
        allowsMultipleSelection: true, // Permite o usuário selecionar mais de uma imagem
      })

      if (selectedPhotos.canceled) {
        return // Se o usuario cancelar a seleção de foto, nada deve ser feito.
      }

      const selectedProductPhotos = selectedPhotos.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName!,
        type: asset.mimeType!,
      }))

      if (productPhotos.length + selectedProductPhotos.length > 3) {
        return toast.show({
          duration: 5000,
          placement: 'top',
          render: ({ id }) => {
            return (
              <Toast
                title="Limíte atingido!"
                subtitle="Você pode selecionar até 3 imagens."
                id={id}
                action="error"
              />
            )
          },
        })
      }

      const updatedPhotos = [...productPhotos, ...selectedProductPhotos]

      setproductPhotos(updatedPhotos)
      setValue('productPhotos', updatedPhotos)
      trigger('productPhotos')
    } catch (error) {
      console.log(error)
    }
  }
  const handleRemoveImage = (uri: string) => {
    const updatedPhotos = productPhotos.filter((photo) => photo.uri !== uri)
    setproductPhotos(updatedPhotos)
    setValue('productPhotos', updatedPhotos)
    trigger('productPhotos')
  }

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      {/* Seleção de imagens */}
      <Section
        title="Imagens"
        subtitle="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!"
      >
        <FormControl w={'$full'} isInvalid={!!errors.productPhotos}>
          <HStack h={100}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {productPhotos.map((item) => (
                <Box key={item.uri}>
                  <Image
                    source={{ uri: item.uri }}
                    h={100}
                    w={100}
                    mr={8}
                    borderRadius={6}
                    alt="imagem do produto"
                  />
                  <Pressable
                    w={100}
                    h={30}
                    m={4}
                    position={'absolute'}
                    left={'70%'}
                    onPress={() => handleRemoveImage(item.uri)}
                  >
                    <Center bg={'$gray200'} borderRadius={999} h={16} w={16}>
                      <Icon as={X} size={'2xs'} color={'$gray700'} />
                    </Center>
                  </Pressable>
                </Box>
              ))}
              <Pressable
                bg="$gray500"
                h={100}
                w={100}
                borderRadius={6}
                borderColor={
                  errors.productPhotos?.message ? '$red700' : 'transparent'
                }
                borderWidth={errors.productPhotos?.message ? 2 : 0}
                onPress={handleImagesSelection}
              >
                <Center flex={1}>
                  <Icon as={Plus} h={1} w={1} size="xl" color="$gray400" />
                </Center>
              </Pressable>
            </ScrollView>
          </HStack>

          {errors.productPhotos && (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {errors.productPhotos.message}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>
      </Section>

      {/* Detalhes do Produto */}
      <Section title="Sobre o produto">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Título do anúncio"
              onChange={onChange}
              errorMessage={errors.name?.message}
              value={value}
            />
          )}
        />

        {/* TextArea */}
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <FormControl w={'$full'} isInvalid={!!errors.description}>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.description?.message}
                </FormControlErrorText>
              </FormControlError>

              <Textarea
                mb={16}
                h={160}
                px={16}
                bg="$gray700"
                borderRadius={6}
                borderColor="transparent"
                $focus-borderColor="$bluelight"
                isInvalid={!!errors.description}
                $invalid-borderWidth={1}
                $invalid-borderColor="$red700"
              >
                <TextareaInput
                  placeholder="Descrição do produto"
                  fontFamily="$body"
                  onChangeText={onChange}
                  value={value}
                />
              </Textarea>
            </FormControl>
          )}
        />

        {/* Radio Button */}
        <Controller
          control={control}
          name="isNew"
          render={({ field: { onChange } }) => (
            <FormControl w={'$full'} isInvalid={!!errors.isNew}>
              <RadioGroup
                onChange={(val) => onChange(val === 'new')}
                flexDirection="row"
                gap={20}
              >
                <Radio
                  isInvalid={!!errors.isNew}
                  value="new"
                  size="md"
                  isDisabled={false}
                >
                  <RadioIndicator mr="$2" borderWidth={1}>
                    <RadioIcon
                      as={CircleIcon}
                      color="$bluelight"
                      h={14}
                      w={14}
                    />
                  </RadioIndicator>

                  <RadioLabel>Produto novo</RadioLabel>
                </Radio>

                <Radio
                  value="used"
                  size="md"
                  isInvalid={!!errors.isNew}
                  isDisabled={false}
                >
                  <RadioIndicator h={20} w={20} mr={8} borderWidth={1}>
                    <RadioIcon
                      as={CircleIcon}
                      color="$bluelight"
                      h={14}
                      w={14}
                    />
                  </RadioIndicator>

                  <RadioLabel>Produto usado</RadioLabel>
                </Radio>
              </RadioGroup>

              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Seleção de produto é obrigatória
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />
      </Section>

      {/* Detalhes da venda do produto */}
      <Section title="Venda">
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Valor do produto"
              keyType="numeric"
              prefix="R$"
              onChange={(value) => onChange(value)}
              value={value}
              errorMessage={errors.price?.message}
            />
          )}
        />

        <VStack>
          <LabelTitle mt={16}>Aceita troca?</LabelTitle>

          <Controller
            control={control}
            name="acceptTrade"
            render={({ field: { onChange, value } }) => (
              <Switch
                trackColor={{ true: '$bluelight', false: '$gray500' }}
                size="lg"
                mt={-10}
                alignSelf="flex-start"
                onToggle={onChange}
                value={value}
              />
            )}
          />
        </VStack>

        <FormControl w="$full" isInvalid={!!errors.paymentMethods}>
          <VStack>
            <LabelTitle mt={16}>Meios de pagamento aceitos</LabelTitle>
            {paymentData.map((method) => (
              <Controller
                key={method.value}
                control={control}
                name="paymentMethods"
                render={({ field: { onChange, value = [] } }) => (
                  <Checkbox
                    mb={14}
                    value={method.value}
                    size="md"
                    aria-label="Checkbox para selecionar meios de pagamento aceitos"
                    isChecked={value.includes(method.value)}
                    onChange={(isSelected) => {
                      if (isSelected) {
                        onChange([...value, method.value])
                      } else {
                        onChange(value.filter((v) => v !== method.value))
                      }
                    }}
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
                      {method.label}
                    </CheckboxLabel>
                  </Checkbox>
                )}
              />
            ))}
            <FormControlError w={'95%'}>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                {errors.paymentMethods?.message}
              </FormControlErrorText>
            </FormControlError>
          </VStack>
        </FormControl>
      </Section>
    </ScrollView>
  )
}
