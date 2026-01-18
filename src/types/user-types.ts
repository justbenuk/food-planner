export interface UserProps {
  name: string,
  email: string,
  emailVerified: boolean,
  image?: string | null | undefined,
  createdAt: Date,
  updatedAt: Date,
  role: string,
  banned: boolean | null | undefined,
  banReason?: string | null | undefined,
  banExpires?: Date | null | undefined,
  stripeCustomerId?: string | null | undefined,
  id: string
}
