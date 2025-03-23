import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

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
				<div className="flex flex-row">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button
								variant="link"
								className="text-primary-foreground"
							>
								My Account
								<ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Button
								variant="link"
								className="text-secondary-foreground no-underline"
								onClick={handleLogout}
								>
									Logout
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
        
        {/* <h1 className='font-medium lg:text-xl text-zinc-500 hidden xl:block'>Available from March</h1> */}
      </div>
    </header>
  )
}

export default Header