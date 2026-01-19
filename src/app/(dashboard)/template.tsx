import { userIsLoggedIn } from "@/actions/user-actions"
import { RootProps } from "@/types"
import Header from "@/components/header/header"

export default async function DashboardTemplate({ children }: RootProps) {
  await userIsLoggedIn()
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
