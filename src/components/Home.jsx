import React from 'react'
import Header from './Header'
import Attendance from './Attendance'
import { Toaster } from './ui/sonner'

const Home = () => {
  return (
    <div className='flex flex-col gap-2 min-h-screen items-center w-screen'>
			<Header />
			<Attendance />
			<Toaster />
		</div>
  )
}

export default Home