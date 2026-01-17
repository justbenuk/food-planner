import { ListCheckIcon } from "lucide-react";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link href={'/'} className="flex flex-row items-center space-x-2">
      <ListCheckIcon className="text-primary" />
      <span className="font-semibold text-xl">Mantry</span>
    </Link>
  )
}

