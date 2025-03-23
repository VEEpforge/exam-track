// Hard Coded
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from "./ui/button"
import {
	Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, 
} from './ui/table'

const Leaves = () => {
	return (
		<Card className="bg-white md:grid md:col-span-1 pt-0">
			<CardHeader className="flex flex-row h-20 items-center justify-between bg-gradient-to-r from-blue-950 from-70% to-cyan-800 to-90% text-primary-foreground rounded-t-xl py-4">
				<CardTitle>Leave Credits</CardTitle>
				<Button
					variant="secondary"
					className="text-primary"
				>
					Apply
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Leaves</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Vacation</TableCell>
							<TableCell className="text-right">7</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Sick</TableCell>
							<TableCell className="text-right">5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Bereavement</TableCell>
							<TableCell className="text-right">3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Emergency Leave</TableCell>
							<TableCell className="text-right">2</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Offset Leave</TableCell>
							<TableCell className="text-right">0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Compensatory Time Off</TableCell>
							<TableCell className="text-right">0</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>

			</CardFooter>
		</Card>
	)
}

export default Leaves