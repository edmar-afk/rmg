import React, { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import Calendar from "../../components/Calendar";
import DashboardCard01 from "../../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../../partials/dashboard/DashboardCard09";
import WorkersCard from "../../partials/dashboard/WorkersCard";
import DashboardCard11 from "../../partials/dashboard/DashboardCard11";
import DashboardCard12 from "../../partials/dashboard/DashboardCard12";
import DashboardCard13 from "../../partials/dashboard/DashboardCard13";
import DateSelect from "../../components/DateSelect";
import image1 from "../../images/draining.png";
import image2 from "../../images/peso.png";
import ScheduleModal from "../../components/admin/ScheduleModal";
function WorkerSchedules() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
			/>

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>

				<main className="grow">
					<div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
						{/* Dashboard actions */}
						<div className="sm:flex sm:justify-between sm:items-center mb-8 items-center">
							{/* Left: Title */}
							<div className="mb-4 sm:mb-0 flex flex-row ">
								<h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
									Schedules for Technicians
								</h1>
							</div>
							<ScheduleModal />
						</div>
						<div className="flex flex-rowm b-12">
							<WorkersCard isPage={true} />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default WorkerSchedules;
