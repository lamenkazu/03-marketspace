import {
  Box,
  Center,
  CircleIcon,
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
  Textarea,
  TextareaInput,
  useToast,
} from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import Plus from 'phosphor-react-native/src/icons/Plus'
import X from 'phosphor-react-native/src/icons/X'
import { useState } from 'react'

import { FilterInfo } from '@/components/FilterInfo'
import { Input } from '@/components/Input'
import { Toast } from '@/components/Toast'

import { Section } from './Section'

type ProductImagesProps = {
  uri: string
  name: string
  type: string
}[]

export const Form = () => {
  const toast = useToast()

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

      setproductPhotos((prevState) => {
        return [...prevState, ...selectedProductPhotos]
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveImage = (uri: string) => {
    setproductPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.uri !== uri),
    )
  }

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <Section
        title="Imagens"
        subtitle="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!"
      >
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
              onPress={handleImagesSelection}
            >
              <Center flex={1}>
                <Icon as={Plus} h={1} w={1} size="xl" color="$gray400" />
              </Center>
            </Pressable>
          </ScrollView>
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
