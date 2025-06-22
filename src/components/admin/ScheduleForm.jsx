import { useState } from "react";import DatePicker from "react-datepicker";import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

function ScheduleForm() {
	const [description, setDescription] = useState("");
	const [scheduleDate, setScheduleDate] = useState(null);
	const [selectedTechnician, setSelectedTechnician] = useState("");
	const [technicianBusy, setTechnicianBusy] = useState(false);

	const technicians = [
		{ id: 1, name: "Technician A", scheduledDates: ["2025-06-22"] },
		{ id: 2, name: "Technician B", scheduledDates: [] },
		{ id: 3, name: "Technician C", scheduledDates: ["2025-06-23"] },
	];

	const checkTechnicianAvailability = (techId, date) => {
		if (!techId || !date) return false;

		const formattedDate = format(date, "yyyy-MM-dd");
		const technician = technicians.find((t) => t.id === parseInt(techId));
		return technician?.scheduledDates.includes(formattedDate);
	};

	const handleTechnicianChange = (e) => {
		const value = e.target.value;
		setSelectedTechnician(value);
		setTechnicianBusy(checkTechnicianAvailability(value, scheduleDate));
	};

	const handleDateChange = (date) => {
		setScheduleDate(date);
		setTechnicianBusy(checkTechnicianAvailability(selectedTechnician, date));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!scheduleDate || !selectedTechnician || technicianBusy) return;
		alert("Form submitted!");
	};

	return (
		<div className="flex items-center justify-center p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-lg bg-white p-6 rounded shadow">
				<div className="mb-4">
					<label className="block mb-1 text-sm font-semibold text-gray-700 ">Select Technician</label>
					<select
						value={selectedTechnician}
						onChange={handleTechnicianChange}
						className={`w-full border rounded px-3 py-2 ${technicianBusy ? "border-red-500 text-red-500" : ""}`}
						required>
						<option value="">-- Choose Technician --</option>
						{technicians.map((tech) => (
							<option
								key={tech.id}
								value={tech.id}>
								{tech.name}
							</option>
						))}
					</select>
					{technicianBusy && (
						<p className="mt-1 text-sm text-red-600">Technician already has a schedule on this date.</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block mb-1 text-sm font-semibold text-gray-700">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border rounded px-3 py-2"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block mb-1 text-sm font-semibold text-gray-700">Select Date</label>
					<DatePicker
						selected={scheduleDate}
						onChange={handleDateChange}
						dateFormat="yyyy-MM-dd"
						className="w-full border rounded px-3 py-2"
						placeholderText="Pick a date"
					/>
				</div>

				<button
					type="submit"
					disabled={technicianBusy}
					className={`w-full py-2 px-4 rounded text-white ${
						technicianBusy ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
					}`}>
					Set Schedule
				</button>
			</form>
		</div>
	);
}

export default ScheduleForm;
