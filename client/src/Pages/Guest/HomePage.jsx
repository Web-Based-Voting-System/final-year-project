import React from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div className="loginWallpaper h-screen w-full">
			<div className="w-2/6 mx-auto py-60">
				<div>
					<Link to={"/login"}>
						{" "}
						<CustomButton buttonText={"Login"} />
					</Link>
				</div>
				<div className="my-20">
					<Link to={"/signup"}>
						{" "}
					<CustomButton buttonText={"Sign up"} />
                              </Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
