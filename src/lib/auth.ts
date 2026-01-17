import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from 'better-auth/plugins'
import db from "./db";
import { nextCookies } from "better-auth/next-js";
import { stripe } from "@better-auth/stripe"
import * as dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Or the latest version from your Stripe dashboard
});

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
      stripeClient: stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "premium",
            priceId: "price_1SqMwEIsTGigWRnP1uFTXAR5",
          },
        ]
      }

    })
  ],
});
