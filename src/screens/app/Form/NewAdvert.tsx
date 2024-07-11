import { useStyled, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useAuth } from '@/hooks/useAuth'
import { useMarketspace } from '@/hooks/useMarketspace'
import { AppNavigationRoutesProp } from '@/routes/app.routes'

import { ActionsButtonGorup } from './components/ActionsButtonGroup'
import { Form, FormSchema, formSchema } from './components/Form'
import { Header } from './components/Header'

export const NewAdvert = () => {
  const styled = useStyled()
  const { colors } = styled.config.tokens

  const { navigate } = useNavigation<AppNavigationRoutesProp>()

  const { user } = useAuth()
  const { handleNewProductInfo } = useMarketspace()

  // Form
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productPhotos: [],
      name: 'teste',
      description: 'description teste',
      isNew: undefined,
      acceptTrade: false,
      price: '33',
      paymentMethods: [],
    },
  })

  const handlePublishAdvert = ({
    productPhotos,
    name,
    description,
    isNew,
    price,
    acceptTrade,
    paymentMethods,
  }: FormSchema) => {
    handleNewProductInfo({
      userId: user.id,
      images: productPhotos,
      isActive: true,
      name,
      description,
      isNew,
      price: Number(price),
      acceptTrade,
      paymentMethods,
    })

    navigate('preview')
  }

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <VStack flex={1} px={24}>
        <Header title="Criar anúncio" />

        <Form
          control={control}
          errors={errors}
          setValue={setValue}
          trigger={trigger}
        />
      </VStack>

      <ActionsButtonGorup
        handleAdvance={handleSubmit(handlePublishAdvert)}
        handleCancel={() => {}}
        isSubmitting={isSubmitting}
      />
    </SafeAreaView>
  )
}
