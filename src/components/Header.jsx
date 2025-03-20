import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
	const navigate = useNavigate();
	const loggedIn = localStorage.getItem("loggedIn") === "true";

	useEffect(() => {
		if (!loggedIn) {
			navigate("/login"); // Redirect to the login page if not logged in
		}
	}, [])
	
	

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <header className="border-grid sticky top-0 z-50 w-full bg-gray-950">
      <div className='flex flex-row items-center justify-between px-4 xl:px-8 xl:py-6 py-4'>
        <h1 className='lg:text-2xl text-lg font-medium font-playfair text-primary-foreground'>Exam <span className='text-blue-500'>track</span></h1>
				<div>
					<a href='mailto:ezraearlvillanueva@gmail.com' className='text-sm text-primary-foreground'>My Account</a>
					<Button
						variant="link"
						className="text-primary-foreground"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</div>
        
        {/* <h1 className='font-medium lg:text-xl text-zinc-500 hidden xl:block'>Available from March</h1> */}
      </div>
    </header>
  )
}

export default Header