import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useContext, useState } from 'react'
import { User, VetContext } from '../../context/VetContext'
import { useStaffDetails } from '../../hooks/useStaffDetails'
import { api } from '../../services/apiClient'
import { queryClient } from '../../services/react-query'

export function DutyButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const [dutyState, setDutyState] = useState<boolean>()

  const { data: userDetails } = useQuery<User>(['me'], async () => {
    const { data } = await api.get<User>('/api/staff/v1/me')
    setDutyState(data.onDuty)
    return {
      ...data,
    }
  })

  const buttonText =
    dutyState === true ? 'Sair do plantão' : 'Entrar no plantão'

  const toastTitle =
    dutyState === true ? 'Saiu do plantão' : 'Entrou no plantão'

  const toastDescription =
    dutyState === true
      ? 'Agora suas horas não serão registradas!'
      : 'Agora você pode receber clientes e suas horas serão contadas!'

  async function handleSetOnDuty() {
    await submitOnDutyState.mutateAsync(!dutyState)
    setDutyState(!dutyState)
  }

  const submitOnDutyState = useMutation(
    async (onDuty: boolean) => {
      await api.patch(`/api/staff/v1/${userDetails?.id}/on-duty`, {
        on_duty: onDuty,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['clinicData'] })
        queryClient.invalidateQueries({ queryKey: ['staff', userDetails!.id] })
        queryClient.invalidateQueries({ queryKey: ['me'] })
        toast({
          title: toastTitle,
          description: toastDescription,
          status: 'success',
          duration: 1500,
          isClosable: true,
        })
      },
      onError: () => {
        toast({
          title: 'Erro no envio da solicitação',
          description: 'Ocorreu um erro no envio do formulário!',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      },
    },
  )

  return (
    <>
      <Button
        p={2}
        bg="green.600"
        _hover={{ background: 'green.800' }}
        borderRadius={500}
        fontSize="0.75rem"
        fontWeight={600}
        color="white"
        onClick={onOpen}
        isLoading={userDetails === undefined}
      >
        {buttonText}
      </Button>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {buttonText}
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja {buttonText.toLowerCase()} ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button bg="white" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                onClick={() => {
                  onClose()
                  handleSetOnDuty()
                }}
                ml={3}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
