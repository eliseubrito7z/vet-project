import { Box, Flex, Heading, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { usePatients } from '../../hooks/usePatients'
import Link from 'next/link'
import { FilterButton } from '../../components/defaults/FilterButton'
import { SmallSearchBar } from '../../components/defaults/SmallSearchBar'
import { SortByButton } from '../../components/defaults/SortByButton'
import { PatientCard } from '../../components/Cards/PatientCard'
import { ErrorOrLoadingMessage } from '../../components/ErrorOrLoadingMessage'
import { Patient } from '../../utils/@types/patient'

export default function Patients() {
  const { data: patients, isFetching, isError, isSuccess } = usePatients()

  const skeletonArray = Array.from(Array(10))

  const isEmpty = patients !== undefined && !(patients.length > 0)

  return (
    <Box
      overflowY="scroll"
      h="100vh"
      w="100%"
      p={['0 1rem', '1rem 1.5rem 1rem 3rem']}
    >
      <Heading
        fontWeight={600}
        fontSize="1.5rem"
        color="green.900"
        lineHeight={1}
      >
        Pacientes
      </Heading>
      {!isSuccess || isEmpty ? (
        <ErrorOrLoadingMessage
          isError={isError}
          isLoading={isFetching}
          isEmpty={isEmpty}
          errorMessage="Pacientes não encontrados"
          emptyMessage="Ainda não existem pacientes registrados"
        />
      ) : (
        <Box pt="2rem">
          <HStack w="100%" justify="space-between">
            <SmallSearchBar />
            <Flex gap={2}>
              <SortByButton />
              <FilterButton />
            </Flex>
          </HStack>
          <Wrap spacing="1.5rem" pt="1rem">
            {patients?.map((patient) => {
              return (
                <WrapItem key={patient.id}>
                  <Link href={`/patients/${patient.id}`}>
                    <PatientCard size="md" {...patient} />
                  </Link>
                </WrapItem>
              )
            })}
          </Wrap>
        </Box>
      )}
    </Box>
  )
}
