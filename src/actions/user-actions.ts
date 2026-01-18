'use server'

import { auth } from "@/lib/auth"
import db from "@/lib/db"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function userCheckActiveSub() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) redirect('/')

    const hasActiveSubscription = await db.subscription.findFirst({
      where: {
        stripeCustomerId: session.user.stripeCustomerId
      }
    })

    if (!hasActiveSubscription) redirect('/choose-plan')

    return hasActiveSubscription

  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.error(error)
  }
}


export async function userIsLoggedIn() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) redirect('/login')

    return true

  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    console.error(error)
  }
}


