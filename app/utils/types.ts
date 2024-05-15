import z from 'zod'
import { LoginSchema } from './FormSchemas/loginSchema'

type FormSchema = z.infer<typeof LoginSchema>

type APIResponse = {
  status: number,
  data?: any,
  message: string,
  token?: string
}

type CompanyDetails = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: any
  companyName: string
  hrEmail: string
  companyAbout: string
  companyCareers: string
  template1: string
  template2: string
  template3: string
  mailSent: boolean
  mailVerified: boolean
  templateUsed: number
  handlerID: number
}

export type {
  FormSchema,
  APIResponse,
  CompanyDetails
}
