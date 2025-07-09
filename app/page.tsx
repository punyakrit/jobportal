'use client'
import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { useUser } from '@/context/user'

function page() {
  const { user } = useUser();

  return (
    <div>
      <Navbar/>
      {JSON.stringify(user)}
    </div>
  )
}

export default page
