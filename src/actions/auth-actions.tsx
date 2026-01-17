'use server'

import { auth } from "@/lib/auth";
import { registerFormSchema } from "@/validators/auth-validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
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
        callbackURL: '/dashboard'
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
