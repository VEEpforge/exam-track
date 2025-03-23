import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import axios from 'axios'
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
	const [isTimedIn, setIsTimedIn] = useState(true);
	const [records, setRecords] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Maximum records per page

	// Set user details
	useEffect(() => {
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, [userData])

	// GET records from JSON server
  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/records?employee_id=${user?.id}`);
        setRecords(response.data);

				// Check if the user is currently timed in (no timeout yet)
				const hasActiveRecord = response.data.some((record) => !record.timeout);
				setIsTimedIn(!hasActiveRecord);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

		if(user || isTimedIn) {	// triggered to refetch
			getRecords();
		}

		getRecords();
  }, [user, isTimedIn]);


	const handleTimeIn = async () => {
    const newRecord = {
      employee_id: user.id,
      timein: new Date().toString(),
      timeout: "",
    };
    try {
      await axios.post("http://localhost:3001/records", newRecord);
      setRecords((prev) => [newRecord, ...prev]);
			// const record = JSON.stringify(response.data);
			// localStorage.setItem("timeIn", record);
			setIsTimedIn(!isTimedIn);
    } catch (error) {
      console.error("Error adding time in:", error);
    }
  };

	const handleTimeOut = async () => {
		
		const updatedRecord = records.find((record) => !record.timeout);
    updatedRecord.timeout = new Date().toString();

    try {
      await axios.put(`http://localhost:3001/records/${updatedRecord.id}`, updatedRecord);
			// Update records
      setRecords((prev) =>
        prev.map((record) =>
          record.id === updatedRecord.id ? { ...record, timeout: updatedRecord.timeout } : record
        )
      );
			setIsTimedIn(!isTimedIn);
    } catch (error) {
      console.error("Error updating time out:", error);
    }
  };
	

	const convertTime = (dateString) => {
		if (dateString == "") {
			return "--"
		}

		const date = new Date(dateString);
		// Extract the hours, minutes, AM/PM
		let hours = date.getHours();
		const minutes = date.getMinutes();
		const amOrPm = hours >= 12 ? "PM" : "AM";

		// Convert hours to 12-hour format
		hours = hours % 12 || 12; // If hours is 0, change it to 12
		// Format the time as 12-hour format
		const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;

		return formattedTime;
	}

	// Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
	const currentRecords = [...records].reverse().slice(indexOfFirstRecord, indexOfLastRecord); // Reverse records here

  const totalPages = Math.ceil(Math.min(records.length, 100) / recordsPerPage);

  return (
		<Card className="bg-white md:grid md:col-span-2 pt-0">
			<CardHeader className="flex flex-row h-20 items-center justify-between bg-gradient-to-r from-blue-950 from-70% to-cyan-800 to-90% text-primary-foreground rounded-t-xl py-4">
				<CardTitle>My Attendance</CardTitle>
				{
					isTimedIn ?
					<Button
						variant="secondary"
						className="bg-primary-foreground text-primary"
						onClick={handleTimeIn}
					>
						Time In
					</Button> :
					<Button
					variant="secondary"
					className="bg-gray-950 text-primary-foreground"
					onClick={handleTimeOut}
				>
					Time Out
				</Button>
				}
			</CardHeader>
			<CardContent>
				<Table className="w-full">
					<TableHeader className="w-full">
						<TableRow className="items-center justify-between">
							<TableHead>Date</TableHead>
							<TableHead className="text-center">Time In</TableHead>
							<TableHead className="text-right">Time Out</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{currentRecords?.map((record) => (
							<TableRow className="justify-items-stretch" key={record?.id}>
								<TableCell className="font-medium">{new Date(record.timein).toLocaleDateString()}</TableCell>
								<TableCell className="text-center">{convertTime(new Date(record.timein))}</TableCell>
								<TableCell className="text-right">{convertTime(record.timeout)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter className='w-full'>
				{/* Pagination */}
				{records.length > recordsPerPage && (
					<div className="flex w-full justify-between mt-4">
						<Button
							variant="secondary"
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
						>
							Previous
						</Button>
						<span className="px-4 py-2">
							Page {currentPage} of {totalPages}
						</span>
						<Button
							variant="secondary"
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
						>
							Next
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
  )
}

export default Attendance