import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Service } from '../../utils/@types/service'
import { kindFormatter } from '../../utils/kindFormatter'
import { phoneFormatter } from '../../utils/phoneFormatter'
import { serviceTypeFormatter } from '../../utils/serviceTypeFormatter'
import { sityFormatter } from '../../utils/sityFormatter'
import { statusFormatter } from '../../utils/statusFormatter'

interface ServiceInformationsProps {
  service: Service
}

export function ServiceInformations({ service }: ServiceInformationsProps) {
  return (
    <VStack
      w="100%"
      sx={{
        span: { fontSize: '0.75rem', display: 'block', fontWeight: 600 },
      }}
    >
      <HStack borderTop="1px" w="100%" justify="space-between" px="0.25rem">
        <Box>
          <span>Paciente</span>
          <Text>{service.patient.name}</Text>
        </Box>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Espécie</span>
            <Text>{kindFormatter(service.patient.kind).name}</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Raça</span>
            <Text>{service.patient.breed}</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Data de Nascimento</span>
            <Text>
              {new Date(service.patient.birthDate).toLocaleDateString()}
            </Text>
          </Box>
        </HStack>
      </HStack>

      <HStack borderTop="1px" w="100%" justify="space-between" px="0.25rem">
        <Box>
          <span>Tutor</span>
          <Text>{service.patient.owner}</Text>
        </Box>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Contato</span>
            <Text>{phoneFormatter(service.patient.ownerContact)}</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Status</span>
            <Text>{statusFormatter(service.status.toString())}</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Criado em</span>
            <Text>
              {dayjs(service.createdAt).format('DD[/]MM[/]YYYY HH:mm')}
            </Text>
          </Box>
        </HStack>
      </HStack>

      <HStack borderTop="1px" w="100%" justify="space-between" px="0.25rem">
        <Box>
          <span>Médico Veterinário</span>
          <Text>{service.staff.fullName}</Text>
        </Box>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Serviço</span>
            <Text>{serviceTypeFormatter(service.type.toString())}</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Realizado em</span>
            <Text>{service.serviceDate}</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Divider orientation="vertical" h="1rem" borderColor="black" />
          <Box>
            <span>Cidade de Atendimento</span>
            <Text>{sityFormatter(service.city)}</Text>
          </Box>
        </HStack>
      </HStack>
    </VStack>
  )
}
