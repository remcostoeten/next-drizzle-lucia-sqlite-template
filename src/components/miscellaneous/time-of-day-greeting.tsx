"use client"

import { useState, useEffect } from 'react'

export default function TimeOfDayGreeting() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) setGreeting('Good morning')
      else if (hour < 18) setGreeting('Good afternoon')
      else setGreeting('Good evening')
    }

    updateGreeting()
    const timer = setInterval(updateGreeting, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return <span>{greeting}</span>
}
