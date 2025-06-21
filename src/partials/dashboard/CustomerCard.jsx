import React from "react";
import Person2Icon from "@mui/icons-material/Person2";
import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
function CustomerCard({ isPage }) {
	const customers = [
		{
			id: "0",
			name: "John Doe",
			location: "Pagadian City",
			status: "Pending",
			feedback: "Positive",
		},
		{
			id: "1",
			name: "John Doe",
			location: "Pagadian City",
			status: "Cancelled",
			feedback: "Negative",
		},
		{
			id: "2",
			name: "John Doe",
			location: "Pagadian City",
			status: "Done",
			feedback: "No Feedback",
		},
	];

	return (
		<div className="w-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex flex-row items-center justify-between">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">Lists of Customers</h2>
				<Link className="font-semibold text-gray-800 dark:text-yellow-500 text-xs">
					{!isPage && (
						<>
							<Link to="/admin/customers">View More</Link>
						</>
					)}
				</Link>
			</header>
			<div className="p-3">
				<div className="overflow-x-auto">
					<table className="table-auto w-full">
						<thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
							<tr>
								<th className="p-2 whitespace-nowrap">
									<div className="font-semibold text-left">Customer Name</div>
								</th>
								<th className="p-2 whitespace-nowrap">
									<div className="font-semibold text-left">Address</div>
								</th>
								<th className="p-2 whitespace-nowrap">
									<div className="font-semibold text-left">Feedback</div>
								</th>
								<th className="p-2 whitespace-nowrap">
									<div className="font-semibold text-center">Status</div>
								</th>
								{isPage && (
									<th className="p-2 whitespace-nowrap">
										<div className="font-semibold text-center">Action</div>
									</th>
								)}
							</tr>
						</thead>
						<tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
							{customers.map((customer) => (
								<tr key={customer.id}>
									<td className="p-2 whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-10 h-10 shrink-0 mr-2 sm:mr-3 pt-2">
												<Person2Icon />
											</div>
											<div className="font-medium text-gray-800 dark:text-gray-100">{customer.name}</div>
										</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div className="text-left">{customer.location}</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div
											className={`text-left text-sm ${
												customer.feedback === "Negative" && customer.status === "Cancelled"
													? "text-red-500"
													: customer.feedback === "No Feedback"
													? "text-gray-400"
													: "text-green-500"
											}`}>
											{customer.feedback}
										</div>
									</td>
									<td className="p-2 whitespace-nowrap">
										<div
											className={`text-center text-sm ${
												customer.status === "Cancelled"
													? "text-red-500"
													: customer.status === "Pending"
													? "text-yellow-500"
													: customer.status === "Done"
													? "text-green-500"
													: ""
											}`}>
											{customer.status}
										</div>
									</td>

									{isPage && (
										<td className="p-2 whitespace-nowrap text-center">
											<DeleteIcon className="text-red-400" />
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default CustomerCard;
