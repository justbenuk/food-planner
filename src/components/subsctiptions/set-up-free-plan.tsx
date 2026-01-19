'use client'

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function FreeSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)

    const { error } = await authClient.subscription.upgrade({
      plan: "free",
      successUrl: "/dashboard?success=true",
      cancelUrl: "/choose-plan",
    })

    if (error) {
      console.error(error.message)
      alert("Failed to start checkout")
    }

    setIsLoading(false)
  }

  return (
    <Button onClick={handleUpgrade} disabled={isLoading}>
      {isLoading ? "Redirecting..." : "Start Free Plan"}
    </Button>
  )
}
