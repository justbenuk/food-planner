import { auth } from "@/lib/auth"
import { User2Icon } from "lucide-react"
import { headers } from "next/headers"
import { Button } from "../ui/button"
import Link from "next/link"

export default async function AuthMenu() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    return (
      <Button asChild>
        <Link href={'/login'}>Login</Link>
      </Button>
    )
  }
  return (
    <div>
      <User2Icon className="size-5" />
    </div>
  )
}

