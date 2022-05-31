import React, { useState } from "react";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [data, setdata] = useState({
		admin_Id: "",
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
		if (data.admin_Id === "" || data.password === "") {
			setmessage("Can not be empty");
		}

		axios
			.post("http://localhost:8081/loginAdmin", data)
			.then(({ data }) => {
				if (data.auth === 0) {
					setmessage(data.message);
				} else {
					localStorage.setItem("token", data.token);
					localStorage.setItem("admin_id", data.admin_Id);
					localStorage.setItem("user_name", data.name);
					navigate("/admin-page");
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="loginWallpaper h-screen">
			<div className="pt-40">
				<form className=" bg-white w-2/6 mx-auto p-8">
					<h2 className="text-3xl pb-5">Login to your admin account</h2>
					{message && (
						<p className="text-lg text-center bg-red-600 p-3 text-white">
							{message}
						</p>
					)}

					<div className="my-4">
						<label className="text-lg my-8">User ID</label>
						<CustomInput
							nameValue={"admin_Id"}
							value={data.admin_Id}
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
					<div className="my-10">
						<Link to={"/select-vote"}>
							{" "}
							<CustomButton
								buttonText={"Login"}
								handleClick={submitLogin}
								backgroundColor={"#00ADEE"}
							/>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
