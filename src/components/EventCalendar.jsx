/* eslint-disable react/prop-types */ import { Menu } from "@headlessui/react";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameDay,
	isSameMonth,
	isToday,
	parse,
	parseISO,
	startOfToday,
} from "date-fns";
import ScheduleModal from "./admin/ScheduleModal";
import { useState } from "react";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import api from "../assets/api";
import { useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function EventCalendar() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	let today = startOfToday();
	let [selectedDay, setSelectedDay] = useState(today);
	let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
	let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
	const [meetings, setMeetings] = useState([]);

	useEffect(() => {
		const fetchSchedules = async () => {
			try {
				const response = await api.get("/api/schedule-list/");
				const data = response.data.map((schedule) => ({
					id: schedule.id,
					name: "Posted an Schedule", // You may need to adjust this according to your data
					description: schedule.description,
					startDatetime: `${schedule.month}T${schedule.startDatetime}`,
					endDatetime: `${schedule.month}T${schedule.endDatetime}`,
				}));
				setMeetings(data);
			} catch (error) {
				console.error("Error fetching schedules:", error);
			}
		};

		fetchSchedules();
	}, []);

	let days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	});

	function previousMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	let selectedDayMeetings = meetings.filter((meeting) => isSameDay(parseISO(meeting.startDatetime), selectedDay));

	return (
		<div className="py-8 w-full">
			<div className="w-full">
				<p className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Schedule Calendar</p>

				<div className="flex flex-row justify-between flex-wrap">
					<div className="md:pr-14 p-3 lg:p-14 rounded-xl bg-white dark:bg-gray-800 flex-1">
						<div className="flex items-center">
							<h2 className="flex-auto font-semibold text-gray-900 dark:text-white">
								{format(firstDayCurrentMonth, "MMMM yyyy")}
							</h2>
							<button
								type="button"
								onClick={previousMonth}
								className="-my-1.5 cursor-pointer flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500  dark:text-white">
								<span className="sr-only">Previous month</span>
								<ChevronLeftIcon />
							</button>
							<button
								onClick={nextMonth}
								type="button"
								className="-my-1.5 cursor-pointer -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500  dark:text-white">
								<span className="sr-only">Next month</span>
								<ChevronRightIcon />
							</button>
						</div>
						<div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500  dark:text-white">
							<div>S</div>
							<div>M</div>
							<div>T</div>
							<div>W</div>
							<div>T</div>
							<div>F</div>
							<div>S</div>
						</div>
						<div className="grid grid-cols-7 mt-2 text-sm  dark:text-white">
							{days.map((day, dayIdx) => (
								<div
									key={day.toString()}
									className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], "py-1.5 ")}>
									<button
										type="button"
										onClick={() => setSelectedDay(day)}
										className={classNames(
											isEqual(day, selectedDay) && "text-white",
											!isEqual(day, selectedDay) && isToday(day) && "text-blue-500",
											!isEqual(day, selectedDay) &&
												!isToday(day) &&
												isSameMonth(day, firstDayCurrentMonth) &&
												"text-gray-900  dark:text-white",
											!isEqual(day, selectedDay) &&
												!isToday(day) &&
												!isSameMonth(day, firstDayCurrentMonth) &&
												"text-gray-400",
											isEqual(day, selectedDay) && isToday(day) && "bg-blue-500",
											isEqual(day, selectedDay) && !isToday(day) && "bg-blue-700 animate-bounce",
											!isEqual(day, selectedDay) && "hover:bg-white",
											(isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
											"mx-auto flex h-8 w-8 items-center justify-center rounded-full"
										)}>
										<time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
									</button>

									<div className="w-5 h-1 mx-auto mt-1">
										{meetings.some((meeting) => isSameDay(parseISO(meeting.startDatetime), day)) && (
											<div className="w-5 h-1 -mt-3 bg-blue-500"></div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
					<section
						className="mt-12 md:mt-0 h-[500px] md:ml-8 p-8 rounded-xl'
					 bg-white dark:bg-gray-800 flex-none w-full max-w-[400px] overflow-y-auto">
						<h2 className="font-semibold text-gray-900  dark:text-white sticky -top-8 pb-3 bg-white  dark:bg-gray-800 z-50">
							Schedule for{" "}
							<time dateTime={format(selectedDay, "yyyy-MM-dd")}>{format(selectedDay, "MMM dd, yyy")}</time>
						</h2>

						<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 dark:text-white">
							{selectedDayMeetings.length > 0 ? (
								selectedDayMeetings.map((meeting) => (
									<li key={meeting.id}>
										<Meeting meeting={meeting} />
									</li>
								))
							) : (
								<p>No Schedule for today.</p>
							)}
						</ol>
					</section>
				</div>
			</div>
		</div>
	);
}

function Meeting({ meeting }) {
	let startDateTime = parseISO(meeting.startDatetime);
	let endDateTime = parseISO(meeting.endDatetime);

	return (
		<div className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
			<ScheduleOutlinedIcon
				fontSize="large"
				className="text-gray-900  dark:text-white animate-spin"
			/>
			<div className="flex-auto">
				<p className="text-gray-900 dark:text-white">{meeting.name}</p>
				<p className="text-blue-900 dark:text-blue-200 font-bold break-all">{meeting.description}</p>
				<p className="mt-0.5">
					<time dateTime={meeting.startDatetime}>{format(startDateTime, "h:mm a")}</time> -{" "}
					<time dateTime={meeting.endDatetime}>{format(endDateTime, "h:mm a")}</time>
				</p>
			</div>
			<Menu
				as="div"
				className="relative">
				<div>
					<Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 dark:text-white hover:text-gray-600">
						<span className="sr-only">Open options</span>
					</Menu.Button>
				</div>
			</Menu>
		</div>
	);
}

let colStartClasses = ["", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"];
