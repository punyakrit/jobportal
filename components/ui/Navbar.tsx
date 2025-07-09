"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './button'
import axios from 'axios'
import { oAuth } from '@/app/actions/auth'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(()=>{
    const getUser = async()=>{
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      if(error){
        console.error(error)
      }else{
        setUser(user)
      }
    }
    getUser()
  },[])


  return (
    <div>
        <Button onClick={async()=>{
            await oAuth()
        }}> {user ? "Logout" : "Login"}</Button>
    </div>
  )
}

export default Navbar
