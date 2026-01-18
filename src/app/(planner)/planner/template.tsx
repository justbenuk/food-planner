import { userCheckActiveSub } from "@/actions/user-actions";
import { RootProps } from "@/types";

export default async function PlannerTemplate({ children }: RootProps) {

  const hasSubscription = await userCheckActiveSub()

  console.log(hasSubscription)
  return (
    <div>{children}</div>
  )
}

