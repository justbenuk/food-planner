import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Button } from "../ui/button"
import Link from "next/link"
import { UserMenu } from "./user.menu"

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
      <UserMenu user={session.user} />
    </div>
  )
}

