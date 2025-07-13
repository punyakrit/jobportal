"use client"
import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
function LogOutButton() {
    const supabase = createClient()
  return (
    <div className="p-4 m-4 bg-green-400/70 rounded-xl cursor-pointer hover:bg-green-500 transition-all duration-500 font-bold" onClick={async () => {
        await supabase.auth.signOut()
        redirect('/')
      }}>
        <div className="flex items-center gap-2">
          <LogOut className="w-7 h-7 text-black" />
          <div className=" font-semibold" >Log out</div>
        </div>
      </div>
  )
}

export default LogOutButton