import z from 'zod'
import { LoginSchema } from './schemas/loginSchema'

type FormSchema = z.infer<typeof LoginSchema>

type APIResponse = {
  status: number,
  data?: any,
  message: string,
  token?: string
}

export type {
  FormSchema,
  APIResponse
}
