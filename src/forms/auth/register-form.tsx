'use client'

import { registerFormSchema } from "@/validators/auth-validators"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { regusterUserAction } from "@/actions/auth-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function RegisterForm() {

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  async function handleRegisterForm(values: z.infer<typeof registerFormSchema>) {
    const { success, message } = await regusterUserAction(values)

    if (!success) {
      toast.error(message)
    } else {
      toast.success(message)
      router.push('/')
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegisterForm)} className="grid gap-6">
        <div>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe:example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button>Register</Button>
      </form>
      <p className="text-sm text-center">Already have an account? <Link href={'/login'} className="underline font-semibold">Log In</Link></p>
    </Form >
  )
}

