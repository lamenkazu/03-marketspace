import {
  Toast as GluestackToast,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface ToastProps extends ComponentProps<typeof GluestackToast> {
  id: string
  title: string
}

export const Toast = ({ id, title, action, ...props }: ToastProps) => {
  const toastId = 'toast-' + id

  return (
    <GluestackToast
      mt={50}
      nativeID={toastId}
      action={action}
      variant="accent"
      {...props}
    >
      <VStack w={'$72'}>
        <ToastTitle>{title}</ToastTitle>
      </VStack>
    </GluestackToast>
  )
}
