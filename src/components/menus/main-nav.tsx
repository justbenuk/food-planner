import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="flex flex-row gap-6">
      <Link href={'/recipes'}>Recipes</Link>
      <Link href={'/choose-plan'}>Plans</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/contact'}>Contact</Link>
    </nav>
  )
}

