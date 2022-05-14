import React, { useState } from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import axios from "axios";

const SignupPage = () => {
	const [data, setdata] = useState({
		username: "",
		student_id: "",
		password: "",
		confrim_password: "",
	});

	const handleChange = (event) => {
		setdata({
			...data,
			[event.target.name]: event.target.value,
		});
	};

	const sentData = {
		name: data.username,
		student_id: data.student_id,
		password: data.password,
	};

	const handleSubmit = (e) => {
            e.preventDefault();
		axios
			.post("http://localhost:8081/createUser", sentData)
			.then(({ data }) => { console.log(data); })
			.catch((err) => console.log(err));
	};

	return (
		<div className="loginWallpaper h-screen">
			<div className="pt-20">
				<form className=" bg-white w-2/6 mx-auto p-10" >
					<h2 className="text-3xl pb-4">Create an account</h2>
					<p className="text-lg pb-1">Have an account? Log in</p>
					<div className="my-4">
						<label className="text-lg">Full name</label>
						<CustomInput
							handleChange={handleChange}
							type={"text"}
							nameValue="username"
							value={data.username}
						/>
					</div>
					<div className="my-4">
						<label className="text-lg">Student ID</label>
						<CustomInput
							handleChange={handleChange}
							type={"number"}
							nameValue="student_id"
							value={data.student_id}
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
