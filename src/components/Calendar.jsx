import React, { useState, useMemo } from "react";import { Box, useTheme } from "@mui/material";import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const backendEvents = [
	{ date: "2025-06-20", title: "Si Mark Byahe sa Dumalinao" },
	{ date: "2025-06-20", title: "Moadto sa Dao" },
	{ date: "2025-06-21", title: "Trabaho ni Jay sa Pagadian" },
	{ date: "2025-06-21", title: "Mo bayad si Secret" },
	{ date: "2025-06-22", title: "Christmas Party" },
];

function Calendar() {
	const [selectedDate, setSelectedDate] = useState(dayjs());
	const theme = useTheme();

	// Convert array to date-event lookup object
	const mockEvents = useMemo(() => {
		const grouped = {};
		backendEvents.forEach(({ date, title }) => {
			if (!grouped[date]) grouped[date] = [];
			grouped[date].push(title);
		});
		return grouped;
	}, []);

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate);
	};

	const dateKey = selectedDate.format("YYYY-MM-DD");
	const eventList = mockEvents[dateKey] || [];

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box sx={{ width: "100%", height: "100%" }}>
				<div className="flex w-full gap-4">
					<div
						style={{ flex: 1 }}
						className="bg-white text-inherit dark:bg-gray-800">
						<DateCalendar
							value={selectedDate}
							onChange={handleDateChange}
							showDaysOutsideCurrentMonth
							renderDay={(day, _value, DayComponentProps) => {
								const dateStr = day.format("YYYY-MM-DD");
								const hasEvents = !!mockEvents[dateStr];

								return (
									<div className="relative">
										{/* default day rendering */}
										<DayComponent {...DayComponentProps} />
										{/* dot if there are events */}
										{hasEvents && (
											<span className="absolute bottom-[6px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-yellow-400" />
										)}
									</div>
								);
							}}
							sx={(theme) => ({
								width: "100%",
								"& .MuiDayCalendar-weekDayLabel": {
									color: theme.palette.mode === "dark" ? "#ffffff" : "inherit",
									fontSize: "2rem",
								},
								"& .MuiPickersDay-root": {
									color: theme.palette.mode === "dark" ? "#ffffff" : "inherit",
									fontSize: "1rem",
									width: "80%",
								},
								"& .MuiTypography-root": {
									fontSize: "1.2rem",
									width: "80%",
								},
								"& .Mui-selected": {
									color: "#ffffff",
								},
							})}
						/>
					</div>

					<div className="flex-1">
						<div className="w-full h-full p-6 bg-white text-inherit dark:bg-gray-800 dark:text-slate-100 rounded-lg">
							<h2 className="text-2xl font-semibold text-center">Schedule Info</h2>
							<p className="mt-4 text-base">
								<strong>{selectedDate.format("MMMM D, YYYY")}</strong>
							</p>
							{eventList.length > 0 ? (
								<ul className="mt-2 list-disc list-inside space-y-1">
									{eventList.map((event, idx) => (
										<li key={idx}>{event}</li>
									))}
								</ul>
							) : (
								<p className="mt-2">No events for this day.</p>
							)}
						</div>
					</div>
				</div>
			</Box>
		</LocalizationProvider>
	);
}

export default Calendar;
