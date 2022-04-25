import React from "react";
import logo from "../../Assets/Logo/logo.png";
import profile from "../../Assets/Images/profile.png";

const Navigation = () => {
	return (
		<div className="flex justify-between items-center px-8 h-16">
			<div>
				<img src={logo} alt="Logo" />
			</div>
			<div className="flex justify-between items-center">
				<p className="pr-8">Not</p>
				<div className="flex justify-between items-center cursor-pointer">
					<img src={profile} alt="Profile"/>
          <p className="px-3">Ekow Turkson</p>
          <p>^</p>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
