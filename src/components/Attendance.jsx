import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

const Attendance = () => {
  return (
    <section className='w-full grid grid-cols-3 gap-x-4 xl:gap-x-8 container xl:mt-8'>
      <Card className="bg-white md:grid col-span-2 pt-0">
				<CardHeader className="flex flex-row items-center justify-between bg-blue-950 text-primary-foreground rounded-t-sm py-4">
					<CardTitle>My Attendance</CardTitle>
					<Button>Time In</Button>
				</CardHeader>
      </Card>
			<Card className="col-span-1">

			</Card>
    </section>
  )
}

export default Attendance