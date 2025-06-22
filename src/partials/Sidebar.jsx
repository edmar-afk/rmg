import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SettingsIcon from "@mui/icons-material/Settings";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import logo from '../images/logo.jpg';
import Person2Icon from "@mui/icons-material/Person2";
function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	});

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded);
		if (sidebarExpanded) {
			document.querySelector("body").classList.add("sidebar-expanded");
		} else {
			document.querySelector("body").classList.remove("sidebar-expanded");
		}
	}, [sidebarExpanded]);

	return (
		<div className="min-w-fit">
			{/* Sidebar backdrop (mobile only) */}
			<div
				className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
					sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				aria-hidden="true"></div>

			{/* Sidebar */}
			<div
				id="sidebar"
				ref={sidebar}
				className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
					sidebarOpen ? "translate-x-0" : "-translate-x-64"
				} ${variant === "v2" ? "border-r border-gray-200 dark:border-gray-700/60" : "rounded-r-2xl shadow-xs"}`}>
				{/* Sidebar header */}
				<div className="flex justify-between mb-10 pr-3 sm:px-2">
					{/* Close button */}
					<button
						ref={trigger}
						className="lg:hidden text-gray-500 hover:text-gray-400"
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						aria-expanded={sidebarOpen}>
						<span className="sr-only">Close sidebar</span>
						<svg
							className="w-6 h-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>
					{/* Logo */}
					<NavLink
						end
						to="/"
						className="flex flex-row items-center">
						<img
							src={logo}
							alt=""
							className="w-12 h-12 rounded-full"
						/>
						<p className="text-gray-800 dark:text-gray-200 ml-3">RMG Septictank Cleaner Services</p>
					</NavLink>
				</div>

				{/* Links */}
				<div className="space-y-8">
					{/* Pages group */}
					<div>
						<h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
							<span
								className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
								aria-hidden="true">
								•••
							</span>
							<span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
						</h3>
						<ul className="mt-3">
							{/* Dashboard */}
							<SidebarLinkGroup
								activecondition={
									pathname === "/" ||
									pathname.includes("dashboard") ||
									pathname.includes("/admin/customers") ||
									pathname.includes("/admin/booking") ||
									pathname.includes("/admin/worker-schedules") ||
									pathname.includes("/admin/unregistered-users")
								}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
													pathname === "/" || pathname.includes("dashboard")
														? ""
														: "hover:text-gray-900 dark:hover:text-white"
												}`}
												onClick={(e) => {
													e.preventDefault();
													handleClick();
													setSidebarExpanded(true);
												}}>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<Person2Icon />
														<span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Admin Pages
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
																open && "rotate-180"
															}`}
															viewBox="0 0 12 12">
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Dashboard
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/s"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Services
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/admin/customers"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Customer
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/admin/booking"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Booking
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/admin/worker-schedules"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Schedule
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="/admin/unregistered-users"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Unregistered Users
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* E-Commerce */}
							<SidebarLinkGroup activecondition={pathname.includes("technician")}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
													pathname.includes("technician") ? "" : "hover:text-gray-900 dark:hover:text-white"
												}`}
												onClick={(e) => {
													e.preventDefault();
													handleClick();
													setSidebarExpanded(true);
												}}>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<Person2Icon />
														<span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Technician Pages
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
																open && "rotate-180"
															}`}
															viewBox="0 0 12 12">
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="#"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																My Schedule
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<SidebarLinkGroup activecondition={pathname.includes("technician")}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<a
												href="#0"
												className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
													pathname.includes("technician") ? "" : "hover:text-gray-900 dark:hover:text-white"
												}`}
												onClick={(e) => {
													e.preventDefault();
													handleClick();
													setSidebarExpanded(true);
												}}>
												<div className="flex items-center justify-between">
													<div className="flex items-center">
														<Person2Icon />
														<span className="text-sm font-medium ml-2 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
															Manager Pages
														</span>
													</div>
													{/* Icon */}
													<div className="flex shrink-0 ml-2">
														<svg
															className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
																open && "rotate-180"
															}`}
															viewBox="0 0 12 12">
															<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
														</svg>
													</div>
												</div>
											</a>
											<div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
												<ul className={`pl-8 mt-1 ${!open && "hidden"}`}>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="#"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Services
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="#"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Unregistered Users
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="#"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Customers
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="#"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Booking
															</span>
														</NavLink>
													</li>
													<li className="mb-1 last:mb-0">
														<NavLink
															end
															to="#"
															className={({ isActive }) =>
																"block transition duration-150 truncate " +
																(isActive
																	? "text-violet-500"
																	: "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
															}>
															<span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
																Schedule
															</span>
														</NavLink>
													</li>
												</ul>
											</div>
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>

							<h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3 mt-12">
								<span
									className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
									aria-hidden="true">
									•••
								</span>
								<span className="lg:hidden lg:sidebar-expanded:block 2xl:block">System Pages</span>
							</h3>
							{/* Messages */}
							<li
								className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
									pathname.includes("messages") &&
									"from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
								}`}>
								<NavLink
									end
									to="#"
									className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
										pathname.includes("accountSettings") ? "" : "hover:text-gray-900 dark:hover:text-white"
									}`}>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<ManageAccountsIcon />
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
												Account Settings
											</span>
										</div>
									</div>
								</NavLink>
							</li>
							<li
								className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
									pathname.includes("messages") &&
									"from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
								}`}>
								<NavLink
									end
									to="#"
									className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
										pathname.includes("systemSettings") ? "" : "hover:text-gray-900 dark:hover:text-white"
									}`}>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<SettingsIcon />
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
												System Settings
											</span>
										</div>
									</div>
								</NavLink>
							</li>
							<li
								className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
									pathname.includes("messages") &&
									"from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
								}`}>
								<NavLink
									end
									to="#"
									className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
										pathname.includes("systemSettings") ? "" : "hover:text-gray-900 dark:hover:text-white"
									}`}>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<PhoneIcon />
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
												Contact Us
											</span>
										</div>
									</div>
								</NavLink>
							</li>
							<li
								className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
									pathname.includes("messages") &&
									"from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
								}`}>
								<NavLink
									end
									to="#"
									className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
										pathname.includes("systemSettings") ? "" : "hover:text-gray-900 dark:hover:text-white"
									}`}>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<InfoIcon />
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
												About Us
											</span>
										</div>
									</div>
								</NavLink>
							</li>
							<li
								className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
									pathname.includes("messages") &&
									"from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
								}`}>
								<NavLink
									end
									to="#"
									className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
										pathname.includes("systemSettings") ? "" : "hover:text-gray-900 dark:hover:text-white"
									}`}>
									<div className="flex items-center justify-between">
										<div className="grow flex items-center">
											<SpeakerNotesIcon />
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
												FAQs
											</span>
										</div>
									</div>
								</NavLink>
							</li>
						</ul>
					</div>
				</div>

				{/* Expand / collapse button */}
				<div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
					<div className="w-12 pl-4 pr-3 py-2">
						<button
							className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
							onClick={() => setSidebarExpanded(!sidebarExpanded)}>
							<span className="sr-only">Expand / collapse sidebar</span>
							<svg
								className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 16 16">
								<path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
