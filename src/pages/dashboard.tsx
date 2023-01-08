import {
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Image as ChakraImage,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { Card } from '../components/Cards/Card'
import { Sidebar } from '../components/navigation/Sidebar'
import * as img from '../assets/assets'
import Image from 'next/image'
import { FiBell, FiPlus } from 'react-icons/fi'
import { DrawerBar } from '../components/navigation/DrawerBar'
import { DrawerTodo } from '../components/navigation/DrawerTodo'
import { useContext, useState } from 'react'
import { Service, VetContext } from '../context/VetContext'
import { SearchBarPatients } from '../components/navigation/SearchBarPatients'
import { TodoBlock } from '../components/Cards/Todo'
import { Report } from '../components/Cards/Report'
import { LastPatients } from '../components/Cards/LastPatients'
import { BillingStatics } from '../components/Cards/BillingStatistics'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { NewPatientModal } from '../components/Modals/NewPatientModal'
import { Header } from '../components/dashboard/Header/Header'
import { ClinicDataCards } from '../components/dashboard/ClinicDataCards/ClinicDataCards'
import { NewReportModal } from '../components/Modals/NewReportModal'

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })
  const [hasNotification, setHasNotification] = useState(true)

  return (
    <Flex m={0} p={0}>
      {isWideVersion && <Sidebar />}
      <Box h="100vh" w="100%" p={['0 1rem', '0.25rem 1.5rem 1rem 3rem']}>
        <HStack w="100%" m={0} p={0} mb="1rem" justify="space-between">
          {!isWideVersion && (
            <HStack mt="-0.4%" justify="space-between" w="100%">
              <Box mt="0.5rem">
                <DrawerBar />
              </Box>
              <Box cursor="pointer" w="100%">
                <DrawerTodo />
              </Box>
              <Box pt="0.5rem">
                <Icon
                  as={FiBell}
                  fill={hasNotification ? 'yellow.400' : ''}
                  stroke={hasNotification ? 'yellow.400' : ''}
                  boxSize="1rem"
                  onClick={() => setHasNotification(!hasNotification)}
                />
              </Box>
            </HStack>
          )}
        </HStack>
        <main>
          <Header />
          <ClinicDataCards />
          <Grid
            display={['flex', 'grid']}
            flexDir="column"
            gap="1rem"
            mt="1rem"
            templateColumns={'70% 30%'}
          >
            <GridItem w="100%">
              <VStack>
                <SearchBarPatients />
                <LastPatients />
                <HStack justify="space-between" w="100%">
                  <BillingStatics type="incomes" />
                  <BillingStatics type="outcomes" />
                </HStack>
              </VStack>
            </GridItem>
            <GridItem w="100%">
              <VStack>
                {isWideVersion && <TodoBlock />}
                <VStack w="100%">
                  <Flex
                    bg="white"
                    w="100%"
                    p="0.75rem"
                    borderRadius={12}
                    justify="space-between"
                    align="center"
                  >
                    <Text fontSize="0.875rem" fontWeight="600" color="black">
                      Relatórios
                    </Text>
                    <NewReportModal />
                  </Flex>
                  <Report
                    createdAt="4 minutos atrás"
                    title="Pagamento de um lote de vacinas para cachorro"
                    type="payment"
                  />
                  <Report
                    createdAt="19 minutos atrás"
                    title="Novo pedido de cosméticos"
                    type="request"
                  />
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </main>
      </Box>
    </Flex>
  )
}
