import React, { useState } from "react";import { Modal, Box, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function BookingEdit() {
	const [open, setOpen] = useState(false);
	const [cancelBooking, setCancelBooking] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<IconButton onClick={handleOpen}>
				<EditIcon className="text-blue-500" />
			</IconButton>

			<Modal
				open={open}
				onClose={handleClose}>
				<Box
					className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg"
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
					}}>
					<Typography
						variant="h6"
						component="h2">
						Edit Booking
					</Typography>

					<FormControl
						fullWidth
						sx={{ mt: 3 }}>
						<InputLabel
							id="cancel-booking-label"
							className="text-black dark:text-white">
							Cancel Booking
						</InputLabel>
						<Select
							labelId="cancel-booking-label"
							value={cancelBooking}
							label="Cancel Booking"
							onChange={(e) => setCancelBooking(e.target.value)}
							className="bg-white dark:bg-gray-700 text-black dark:text-white"
							sx={{
								"& .MuiOutlinedInput-notchedOutline": {
									borderColor: "rgba(0,0,0,0.23)",
								},
								"&:hover .MuiOutlinedInput-notchedOutline": {
									borderColor: "#1976d2",
								},
								"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
									borderColor: "#1976d2",
								},
							}}>
							<MenuItem value="yes">Yes</MenuItem>
							<MenuItem value="no">No</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Modal>
		</div>
	);
}

export default BookingEdit;
