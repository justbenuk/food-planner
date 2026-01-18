import { userIsLoggedIn } from "@/actions/user-actions";
import { RootProps } from "@/types";

export default async function template({ children }: RootProps) {
  await userIsLoggedIn()
  return (
    <div>{children}</div>
  )
}

