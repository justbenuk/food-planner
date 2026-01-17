'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

export default function ToggleDarkMode() {

  //to stop the hydration errors, we need to mount the state on render
  const [mounted, setMounted] = useState(false)
  //get the status of the theme 
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div>
      {theme === 'light' ? (
        <Button variant={'ghost'} size={'icon'} onClick={() => setTheme('dark')}>
          <MoonIcon className="size-5" />
        </Button>
      ) : (
        <Button variant={'ghost'} size={'icon'} onClick={() => setTheme('light')}>
          <SunIcon className="size-5" />
        </Button>
      )}
    </div>
  )
}

