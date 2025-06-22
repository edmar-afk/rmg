import React, { useState } from "react";import {	Modal,
	Box,
	Typography,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

function BookingEdit() {
	const [open, setOpen] = useState(false);
	const [bookingStatus, setBookingStatus] = useState("pending");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = () => {
		if (!bookingStatus) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "Please select a booking status.",
			});
			return;
		}

		Swal.fire({
			icon: "success",
			title: "Booking Updated",
			text: `Booking has been marked as ${bookingStatus.toUpperCase()}.`,
		});
		handleClose();
	};

	return (
		<div>
			<IconButton onClick={handleOpen}>
				<EditIcon className="text-blue-500" />
			</IconButton>

			<Modal
				open={open}
				onClose={handleClose}>
				<Box
					className="bg-white p-6 rounded-lg shadow-lg"
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
					}}>
					<Typography
						variant="h6"
						component="h3"
						className="text-gray-800 text-center">
						John Doe requested a booking on June 21, 2025.
					</Typography>

					<FormControl
						component="fieldset"
						sx={{ mt: 3, mb: 3 }}>
						<RadioGroup
							value={bookingStatus}
							onChange={(e) => setBookingStatus(e.target.value)}>
							<FormControlLabel
								value="pending"
								control={<Radio />}
								label="Pending"
							/>
							<FormControlLabel
								value="accepted"
								control={<Radio />}
								label="Accept"
							/>
							<FormControlLabel
								value="rejected"
								control={<Radio />}
								label="Reject"
							/>
						</RadioGroup>
					</FormControl>

					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						className="mt-4 w-full bg-blue-500 hover:bg-blue-600">
						Submit
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default BookingEdit;
