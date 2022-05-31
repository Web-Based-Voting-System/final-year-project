import React, { useState } from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
	const [data, setdata] = useState({
		admin_id: "",
		admin_name: "",
		password: "",
		confrim_password: "",
	});
	const [message, setmessage] = useState("");

	const navigate = useNavigate();

	const handleChange = (event) => {
		setdata({
			...data,
			[event.target.name]: event.target.value,
		});
		console.log(data);
		setmessage("");
	};

	const sentData = {
		admin_id: data.admin_id,
		admin_name: data.admin_name,
		password: data.password,
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.admin_name === '' || data.admin_id === "" || data.password === "") {
			setmessage("All fields are required");
		}else{
			axios
				.post("http://localhost:8081/createadmin", sentData)
				.then(({ data }) => {
					navigate("/");
					setdata("");
				})
				.catch((err) => console.log(err));

		}
	};

	return (
		<div className="loginWallpaper h-screen">
			<div className="pt-20">
				<form className=" bg-white w-2/6 mx-auto p-10">
					<h2 className="text-3xl pb-4">Create an account</h2>
					<Link to={"/"}>
						<p className="text-lg pb-1 cursor-pointer">
							Have an account? Log in
						</p>
					</Link>

					{message && (
						<p className="text-lg my-2 text-center bg-red-600 p-2 text-white">
							{message}
						</p>
					)}
					<div className="my-4">
						<label className="text-lg">Full name</label>
						<CustomInput
							handleChange={handleChange}
							type={"text"}
							nameValue="admin_name"
							value={data.admin_name}
						/>
					</div>
					<div className="my-4">
						<label className="text-lg">Admin ID</label>
						<CustomInput
							handleChange={handleChange}
							type={"number"}
							nameValue="admin_id"
							value={data.admin_id}
						/>
					</div>
					<div className="my-4">
						<label className="text-lg">Password</label>
						<CustomInput
							handleChange={handleChange}
							type={"password"}
							nameValue="password"
							value={data.password}
						/>
					</div>
					<div>
						<label className="text-lg">Confirm Password</label>
						<CustomInput
							handleChange={handleChange}
							type={"password"}
							nameValue="confrim_password"
							value={data.confrim_password}
						/>
					</div>
					<p className="text-lg pb-3 text-right underline cursor-pointer">
						Forgot password?
					</p>
					<div className="my-4">
						<CustomButton
							buttonText={"Create account"}
							handleClick={handleSubmit}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
