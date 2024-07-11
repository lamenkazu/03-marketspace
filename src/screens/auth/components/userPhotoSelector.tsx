import { useToast } from '@gluestack-ui/themed'
import * as ImagePicker from 'expo-image-picker'
import PencilSimpleLine from 'phosphor-react-native/src/icons/PencilSimpleLine'
import { Dispatch, SetStateAction } from 'react'

import { Avatar } from '@/components/Avatar'
import { Toast } from '@/components/Toast'
import { UserImageProps } from '@/contexts/AuthContext'

interface UserPhotoSelectorProps {
  PHOTO_SIZE: number
  userPhoto: UserImageProps
  setUserPhoto: Dispatch<SetStateAction<UserImageProps>>
}

export const UserPhotoSelector = ({
  PHOTO_SIZE,
  userPhoto,
  setUserPhoto,
}: UserPhotoSelectorProps) => {
  const toast = useToast()

  const handleSelectUserPhoto = async () => {
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // tipo de conteudo que quer selecionar da galeria do usuario
        quality: 1, // qualidade da imagem vai de 0 a 1
        aspect: [4, 4], // Aspecto da imagem. No caso, 4 por 4 é uma imagem quadrada, poderia ser 3/4 e dai em diante.
        allowsEditing: true, // Permite o usuário editar a imagem após selecionar ela.
      })

      if (selectedPhoto.canceled) {
        return // Se o usuario cancelar a seleção de foto, nada deve ser feito.
      }

      const { fileSize, uri, fileName, mimeType } = selectedPhoto.assets[0]

      if (uri && fileSize) {
        const fileSizeInMb = fileSize / 1024 / 1024

        if (fileSizeInMb > 5) {
          return toast.show({
            duration: 1800,
            placement: 'top',
            render: ({ id }) => {
              return (
                <Toast
                  title="Imagem muito grande!"
                  subtitle="Ecolha uma de até 5MB"
                  id={id}
                  action="error"
                />
              )
            },
          })
        }

        setUserPhoto({
          uri,
          name: fileName!,
          type: mimeType!,
        })
      }

      toast.show({
        duration: 1800,
        placement: 'top',
        render: ({ id }) => {
          return <Toast title="Foto atualizada!" id={id} action="success" />
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Avatar
      mt={32}
      userPhoto={userPhoto.uri}
      avatarSize={PHOTO_SIZE}
      hasButton
      Icon={PencilSimpleLine}
      onPress={handleSelectUserPhoto}
    />
  )
}
