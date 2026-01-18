'use client'

import { loginUserAction } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginFormSchema } from "@/validators/auth-validators"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

export default function LoginForm() {

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function handleUserLogin(values: z.infer<typeof loginFormSchema>) {
    const { success, message } = await loginUserAction(values)

    if (!success) {
      toast.error(message)
    } else {
      toast.success(message)
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUserLogin)} className="grid gap-6">
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
        <Button>Login</Button>
      </form>
      <p className="text-sm text-center">Don&apos;t have an account already? <Link href={'/register'} className="underline font-semibold">Register</Link></p>
    </Form >

  )
}

