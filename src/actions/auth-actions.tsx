'use server'

import { auth } from "@/lib/auth";
import { loginFormSchema, registerFormSchema } from "@/validators/auth-validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function regusterUserAction(data: z.infer<typeof registerFormSchema>) {
  try {

    //validate the  register user form
    const validated = registerFormSchema.parse(data)
    await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        password: validated.password,
        image: '/assets/profile.webp',
        callbackURL: '/'
      }
    })

    return { success: true, message: 'User Registered' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: 'Invalid Credentials' }
  }
}

export async function loginUserAction(data: z.infer<typeof loginFormSchema>) {
  try {
    const validated = loginFormSchema.parse(data)

    await auth.api.signInEmail({
      body: {
        email: validated.email,
        password: validated.password,
        callbackURL: '/',
        rememberMe: true
      }
    })
    return { success: true, message: 'User Signed In' }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: 'Invalid Credentials' }

  }
}

export async function logoutUserAction() {
  await auth.api.signOut({
    headers: await headers()
  })
  redirect('/')
}
