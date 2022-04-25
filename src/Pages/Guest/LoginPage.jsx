import React from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import { Link } from "react-router-dom";

const LoginPage = () => {
	return (
		<div className="loginWallpaper h-screen">
			<div className="pt-40">
				<form className=" bg-white w-2/6 mx-auto p-8">
					<h2 className="text-3xl pb-5">Login to your account</h2>
					<p className="text-lg pb-3">New User? Create an account </p>
					<div className="my-4">
						<label className="text-lg my-8">Email Address</label>
						<CustomInput />
					</div>
					<div>
						<label>Password</label>
						<CustomInput />
					</div>
					<p className="text-lg pb-3 text-right underline cursor-pointer">
						Forgot password?
					</p>
					<div className="my-4">
						<Link to={"/categories"}>
							{" "}
							<CustomButton buttonText={"Login"} />
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
