import { ProSubscriptionButton } from "@/components/subsctiptions/pro-sub-button";
import { FreeSubscriptionButton } from "@/components/subsctiptions/set-up-free-plan";

export default async function ChoosePlanPage() {

  return (
    <>
      <FreeSubscriptionButton />
      <ProSubscriptionButton />
    </>
  )
}

