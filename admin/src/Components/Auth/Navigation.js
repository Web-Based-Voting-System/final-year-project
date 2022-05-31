import React from "react";
import logo from "../../Assets/Logo/logo.png";
import profile from "../../Assets/Images/profile.png";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
	const navigate = useNavigate();

	const logoutUser = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_name");
		navigate("/");
	};



	const username = localStorage.getItem("user_name");

	return (
		<div className="flex justify-between items-center px-8 h-16 py-8">
			<div>
				<img src={logo} alt="Logo" />
			</div>
			<div className="flex justify-between items-center ">
				<div className="flex justify-between items-center cursor-pointer">
					<img src={profile} alt="Profile" />
					<p className="px-2">{username}</p>
					<button
						onClick={logoutUser}
						className="px-4 ml-8 py-2 bg-red-500 text-white"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
