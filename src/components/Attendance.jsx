import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import {
	Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, 
} from './ui/table'

const Attendance = () => {
	const [user, setUser] = useState(null)
	const userData = localStorage.getItem("user");
	const [timeInOut, setTimeInOut] = useState("Time In");
	const [records, setRecords] = useState([]);

	useEffect(() => {
		// Parse and set user details
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, [])

	useEffect(() => {
		const getEmployeeRecords = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/records?employee_id=${user?.id}`);
				setRecords(response.data);
				console.log(response.data);
			} catch (err) {
				console.error("Error fetching records:", err);
			}
		};

		getEmployeeRecords();
	}, [user])
	
	
	const handleTimeInOut = async () => {
		if (timeInOut === "Time In") {
			localStorage.setItem("timeIn", new Date());
			setTimeInOut("Time Out");
		} else {
			localStorage.setItem("timeOut", new Date())
			setTimeInOut("Time In")

			const newRecord = {
				"employee_id": user.id,
				"timein": localStorage.getItem("timeIn"),
				"timeout": localStorage.getItem("timeOut")
			}

			try {
				const response = await axios.post("http://localhost:3001/records", newRecord)
				// toast("Event has been created", {
        //   description: response.data,
        //   action: {
        //     label: "Undo",
        //     onClick: () => console.log("Undo"),
        //   },
        // })
				console.log(response.data);
			} catch (error) {
				toast("Error", {
          description: error,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
			}	
		}
	}

	const convertTime = (dateString) => {
		const date = new Date(dateString);

		// Extract the hours, minutes
		let hours = date.getHours();
		const minutes = date.getMinutes();

		// Determine AM or PM
		const amOrPm = hours >= 12 ? "PM" : "AM";

		// Convert hours to 12-hour format
		hours = hours % 12 || 12; // If hours is 0, change it to 12

		// Format the time as 12-hour format
		const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;

		return formattedTime;
	}

  return (
    <section className='w-full grid grid-cols-3 gap-x-4 xl:gap-x-8 container xl:mt-8'>
      <Card className="bg-white md:grid col-span-2 pt-0">
				<CardHeader className="flex flex-row items-center justify-between bg-blue-950 text-primary-foreground rounded-t-sm py-4">
					<CardTitle>My Attendance</CardTitle>
					<Button
					variant="secondary"
					className={`${ timeInOut === "Time In" ? "bg-primary-foreground text-gray-950" : "bg-gray-950 text-primary-foreground"}`}
						onClick={handleTimeInOut}
					>
						{timeInOut}
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Time In</TableHead>
								<TableHead>Time Out</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{records?.map((record) => (
								<TableRow key={record?.id}>
									<TableCell className="font-medium">{new Date(record.timein).toLocaleDateString()}</TableCell>
									<TableCell>{convertTime(new Date(record.timein))}</TableCell>
									<TableCell>{convertTime(new Date(record.timeout))}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
      </Card>
			<Card className="col-span-1">
				
			</Card>
    </section>
  )
}

export default Attendance