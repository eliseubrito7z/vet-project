import { Patient } from './patient'
import { ReducedStaff } from './reducedStaff'
import { Role } from './staff'

export enum ServiceTypes {
  'EXAM',
  'MEDICAL_CARE',
  'HOME_CARE',
  'SURGERY',
  'EMERGENCY',
}

export enum ServiceStatus {
  'NOT_INITIALIZED',
  'IN_PROGRESS',
  'COMPLETED',
  'SCHEDULED',
  'WAITING_PAYMENT',
  'PAID',
  'CANCELED',
}

export type Service = {
  id: number
  createdAt: string
  serviceDate: string
  title: string
  description: string
  price: number
  patient: Patient
  staff: ReducedStaff
  type: ServiceTypes
  status: ServiceStatus
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}

export type ServiceReduced = {
  id: number
  createdAt: string
  serviceDate: string
  patient: {
    name: string
    kind: string
  }
  type: ServiceTypes
  status: ServiceStatus
  city: 'TRINDADE_PE' | 'ARARIPINA_PE' | 'OURICURI_PE'
}
