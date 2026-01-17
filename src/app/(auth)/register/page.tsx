import RegisterForm from "@/forms/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Register for an account</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your email below to register an account</p>
      </div>
      <RegisterForm />
    </div>
  )
}

