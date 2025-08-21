import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div  className="min-h-screen bg-black">
           <Navbar />
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
           <Outlet/>
           </div>
    </div>
  )
}

export default RootLayout