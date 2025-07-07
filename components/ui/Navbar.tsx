"use client"
import React from 'react'
import { Button } from './button'
import axios from 'axios'

function Navbar() {

    async function login(){
        const response = await axios.post('/api/v1/auth')
        console.log(response.data)
    }

  return (
    <div>
        <Button onClick={login}> Login</Button>
    </div>
  )
}

export default Navbar
