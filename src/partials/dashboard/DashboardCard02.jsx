function DashboardCard02({ title, number, image }) {
	const displayNumber = title === "Total Earnings Today" ? `₱ ${number}` : number;
	return (
		<div className="relative flex flex-col w-full mx-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl h-44">
			<div className="px-5 pt-5">
				<header className="flex justify-between items-start mb-2">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
					{/* Menu button */}
				</header>
				<div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Total</div>
				<div className="flex items-start">
					<div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{displayNumber}</div>
				</div>
			</div>
			
			<div className="absolute right-4 bottom-4">
				<img
					src={image}
					className="w-24"
					alt=""
				/>
			</div>
		</div>
	);
}

export default DashboardCard02;
