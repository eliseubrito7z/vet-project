import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Select,
  HStack,
  ModalFooter,
  useDisclosure,
  Icon,
  Textarea,
  Text,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '../../services/api'

const newReportModalSchema = z.object({
  type: z.string({ required_error: 'Tipo é obrigatório' }),
  urgency: z.string({ required_error: 'Urgência é obrigatório' }),
  title: z
    .string()
    .min(15, { message: 'O Título deve conter no mínimo 15 caracteres' })
    .max(70, { message: 'O Título deve conter no máximo 70 caracteres' }),
  description: z
    .string()
    .min(15, { message: 'A descrição deve conter no mínimo 15 caracteres' })
    .max(70, { message: 'A descrição deve conter no máximo 255 caracteres' }),
})

type newReportModalData = z.infer<typeof newReportModalSchema>

export function NewReportModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newReportModalData>({
    resolver: zodResolver(newReportModalSchema),
  })

  async function handleCreateNewReport(data: newReportModalData) {
    console.log(data)

    const response = await api.post('/reports/create', {
      description: data.description,
      title: data.title,
      type: data.type,
      staff_id: 1,
    })

    const createdSuccess = response.status === 201
    if (createdSuccess) {
      reset()
    }
    return createdSuccess
  }

  return (
    <>
      <Icon
        bg="green.600"
        borderRadius="full"
        p={1}
        alignItems="center"
        display="flex"
        as={FiPlus}
        boxSize={6}
        color="white"
        onClick={onOpen}
        cursor="pointer"
      />

      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Novo relatório</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(handleCreateNewReport)}>
            <ModalBody>
              <VStack>
                <HStack w="100%">
                  <VStack w="100%">
                    <Select
                      placeholder="Tipo"
                      isInvalid={errors.type !== undefined}
                      errorBorderColor="red"
                      {...register('type')}
                    >
                      <option value="PAYMENT">Pagamento</option>
                      <option value="REQUEST">Pedido</option>
                      <option value="REPORT">Relatório</option>
                    </Select>
                    {errors.type && (
                      <Text size="sm">{errors.type?.message}</Text>
                    )}
                  </VStack>
                  <VStack w="100%">
                    <Select
                      placeholder="Urgência"
                      isInvalid={errors.urgency !== undefined}
                      errorBorderColor="red"
                      {...register('urgency')}
                    >
                      <option value="HIGH">Alta</option>
                      <option value="MEDIUM">Média</option>
                      <option value="LOW">Baixa</option>
                      <option value="NONE">Nenhuma</option>
                    </Select>
                    {errors.urgency && (
                      <Text size="sm">{errors.urgency?.message}</Text>
                    )}
                  </VStack>
                </HStack>
                <VStack w="100%" align="start">
                  <Input
                    type="text"
                    variant="flushed"
                    placeholder="Titulo"
                    required
                    isInvalid={errors.title !== undefined}
                    errorBorderColor="red"
                    {...register('title')}
                  />
                  {errors.title && (
                    <Text fontSize="sm">{errors.title?.message}</Text>
                  )}
                  <Textarea
                    placeholder="Descrição"
                    isInvalid={errors.description !== undefined}
                    errorBorderColor="red"
                    {...register('description')}
                  />
                  {errors.description && (
                    <Text fontSize="sm">{errors.description?.message}</Text>
                  )}
                </VStack>
                <Input type="file" variant="unstyled" />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                bg="green.600"
                _hover={{ background: 'green.800' }}
                color="white"
                type="submit"
                isLoading={isSubmitting}
              >
                Concluir
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
