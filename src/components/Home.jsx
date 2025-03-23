import React from 'react'
import Header from './Header'
import Attendance from './Attendance'
import { Toaster } from './ui/sonner'
import Leaves from './Leaves'

const Home = () => {
  return (
    <div className='flex flex-col gap-2 min-h-screen items-center w-screen'>
			<Header />
			<section className='w-full grid grid-rows-1 md:grid-cols-3 gap-x-4 xl:gap-x-8 container xl:mt-8'>
				<Attendance />
				<Leaves />
			</section>
		</div>
  )
}

export default Home