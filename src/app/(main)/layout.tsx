import { RootProps } from "@/types";

export default function MainLayout({ children }: RootProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main>{children}</main>
    </div>
  )
}

