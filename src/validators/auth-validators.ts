import z from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, 'Please provide your name'),
  email: z.string().email('Please provide your email'),
  password: z.string().min(8, 'Your password needs to be 8 characters'),
  confirmPassword: z.string().min(8, 'Your password needs to be 8 characters')
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Your passwords dont match'
})

export const loginFormSchema = z.object({
  email: z.string().email('Please provide your email'),
  password: z.string().min(8, 'Your password needs to be 8 characters'),
})
