'use client'
import HeroPage from '@/components/landing/HeroPage'
import Banner from '@/components/landing/Banner'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

function page() {

  return (
    <div className=' '>
      <Banner/>
      <Navbar/>
      <HeroPage/>
    </div>
  )
}

export default page
