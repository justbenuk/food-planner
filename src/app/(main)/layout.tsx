import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { RootProps } from "@/types";

export default function MainLayout({ children }: RootProps) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-6 2xl:px-0">{children}</main>
      <Footer />
    </div>
  )
}

