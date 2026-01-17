import AuthMenu from "../menus/auth-menu";
import MainNav from "../menus/main-nav";
import SiteLogo from "../shared/site-logo";
import { SearchIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between py-4 px-6">
      <div className="flex flex-row items-center justify-center gap-6">
        <SiteLogo />
        <MainNav />
      </div>
      <div className="flex flex-row gap-4 items-center">
        <SearchIcon className="size-5" />
        <AuthMenu />
      </div>
    </div>
  )
}

