import React, { useState } from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [data, setdata] = useState({
		student_id: "",
		password: "",
	});
	const [message, setmessage] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setdata({
			...data,
			[e.target.name]: e.target.value,
		});
		setmessage("");
	};

	const submitLogin = (e) => {

		e.preventDefault();
		if (data.student_id === "" || data.password === "") {
			setmessage("Can not be empty");
		}

		axios
			.post("http://localhost:8081/loginUser", data)
			.then(({ data }) =>  {
				if(data.auth === 0){
					setmessage(data.message)
				}else{
					localStorage.setItem("token", data.token);
					localStorage.setItem("user_id", data.user_id);
					localStorage.setItem("user_name", data.name);
					navigate("/select-vote")
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="loginWallpaper h-screen">
			<div className="pt-40">
				<form className=" bg-white w-2/6 mx-auto p-8">
					<h2 className="text-3xl pb-5">Login to your account</h2>
					<p className="text-lg pb-3">New User? Create an account </p>
					<p className="text-lg pb-3">{message && message}</p>

					<div className="my-4">
						<label className="text-lg my-8">User ID</label>
						<CustomInput
							nameValue={"student_id"}
							value={data.student_id}
							handleChange={handleChange}
							type="text"
						/>
					</div>
					<div>
						<label>Password</label>
						<CustomInput
							nameValue={"password"}
							value={data.password}
							handleChange={handleChange}
							type="password"
						/>
					</div>
					<p className="text-lg pb-3 text-right underline cursor-pointer">
						Forgot password?
					</p>
					<div className="my-4">
						<Link to={"/select-vote"}>
							{" "}
							<CustomButton
								buttonText={"Login"}
								handleClick={submitLogin}
							/>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
