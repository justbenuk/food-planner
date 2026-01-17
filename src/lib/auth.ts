import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from 'better-auth/plugins'
import db from "./db";
import { nextCookies } from "better-auth/next-js";
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe";


export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  plugins: [
    admin(),
    nextCookies(),
    stripe({
      stripeClient: new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2025-12-15.clover", // Ensure this matches your dashboard
      }),
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: 'free',
            limits: {
              recipes: 20
            }
          },
          {
            name: "premium",
            priceId: "price_1SqMwEIsTGigWRnP1uFTXAR5",
            freeTrial: {
              days: 14
            }
          },

        ]
      }
    })
  ],
});
