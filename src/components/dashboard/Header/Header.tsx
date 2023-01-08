import { HStack, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { VetContext } from '../../../context/VetContext'
import { NewPatientModal } from '../../Modals/NewPatientModal'

export function Header() {
  const { user } = useContext(VetContext)

  return (
    <HStack w="100%" align="center" justify="space-between" mb="1.75rem">
      <VStack align="start">
        <Text
          fontWeight={600}
          fontSize="1.5rem"
          color="green.900"
          lineHeight={1}
        >
          Bem-vind{user.sex.includes('m') ? 'o' : 'a'} novamente,{' '}
          {user.firstName}
        </Text>

        <Text
          fontWeight={600}
          fontSize="0.75rem"
          color="gray.200"
          lineHeight={1}
          sx={{ span: { color: 'green.600' } }}
        >
          Sua clinica está trabalhando no modo: <span>Normal</span>
        </Text>
      </VStack>
      <NewPatientModal />
    </HStack>
  )
}
