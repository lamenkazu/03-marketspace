import { useStyled, VStack } from '@gluestack-ui/themed'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useMarketspace } from '@/hooks/useMarketspace'

import { ActionsButtonGorup } from './components/ActionsButtonGroup'
import { Form, FormSchema, formSchema } from './components/Form'
import { Header } from './components/Header'

export const NewAdvert = () => {
  const styled = useStyled()
  const { colors } = styled.config.tokens

  const { publishProduct } = useMarketspace()

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
      name: '',
      description: '',
      isNew: undefined,
      acceptTrade: false,
      price: '',
      paymentMethods: [],
    },
  })

  const handleCreate = (data: FormSchema) => {
    console.log(data)
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
        handleAdvance={handleSubmit(handleCreate)}
        handleCancel={() => {}}
        isSubmitting={isSubmitting}
      />
    </SafeAreaView>
  )
}
