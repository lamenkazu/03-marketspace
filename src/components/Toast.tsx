import {
  Toast as GluestackToast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

interface ToastProps extends ComponentProps<typeof GluestackToast> {
  id: string
  title: string
  subtitle?: stirng
}

export const Toast = ({
  id,
  title,
  subtitle,
  action,
  ...props
}: ToastProps) => {
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
        <ToastDescription>{subtitle}</ToastDescription>
      </VStack>
    </GluestackToast>
  )
}
