import { useStyled, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { BackHandler } from 'react-native'
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

  const { navigate, dispatch } = useNavigation<AppNavigationRoutesProp>()

  const { user } = useAuth()
  const { handleNewProductInfo, handleCleanNewProductInfo } = useMarketspace()

  // Form
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productPhotos: [],
      name: 'kkk',
      description: 'kkkkkkk',
      isNew: undefined,
      acceptTrade: false,
      price: '33',
      paymentMethods: [],
    },
  })

  const handleCancel = useCallback(() => {
    dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'my-adverts' }],
      }),
    )
    handleCleanNewProductInfo()
  }, [dispatch, handleCleanNewProductInfo])

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

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCancel()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [handleCancel]),
  )

  return (
    <SafeAreaView
      style={{
        marginTop: 30,
        flex: 1,
        backgroundColor: colors.gray600,
      }}
    >
      <VStack flex={1} px={24}>
        <Header title="Criar anúncio" goBack={handleCancel} />

        <Form
          control={control}
          errors={errors}
          setValue={setValue}
          trigger={trigger}
        />
      </VStack>

      <ActionsButtonGorup
        handleAdvance={handleSubmit(handlePublishAdvert)}
        handleCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </SafeAreaView>
  )
}
