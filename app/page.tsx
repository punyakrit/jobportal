import Navbar from '@/components/ui/Navbar'
import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

async function page() {
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default page
