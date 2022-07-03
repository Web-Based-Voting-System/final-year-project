import React, { useEffect, useState } from "react";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import axios from "axios";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import { Link } from "react-router-dom";
import Modal from "../../Components/Auth/Modal";

const Admin = () => {
	const [category, setcategory] = useState([]);
	const [visibilities, setvisibilities] = useState(false);

	const [data, setdata] = useState({
		election_name: "",
		election_description: "",
	});
	const [message, setmessage] = useState("");

	const handleChange = (e) => {
		setdata({
			...data,
			[e.target.name]: e.target.value,
		});
		setmessage("");
	};

	const createElection = (e) => {
		e.preventDefault();
		if (data.election_name === "" || data.election_description === "") {
			setmessage("Can not be empty");
		} else {
			axios
				.post("http://localhost:8081/admin/create-vote", data)
				.then(({ data }) => {
					setmessage(data);
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios.get(`http://localhost:8081/admin/electiontype`).then(({ data }) => {
				setcategory(data);
			});
		}

		return () => {};
	}, [category]);

	const displayCreateVote = () => {
		setvisibilities(true);
	};

	const closeCreateVote = () => {
		setvisibilities(false);
	};

	return (
		<div className="w-full bg-[#F7F8FC] h-screen overflow-y-scroll">
			<div
				className={`w-screen h-screen bg-[#00000090] fixed z-40  ${
					visibilities ? "" : "hidden"
				} `}
			>
				<Modal closeCreateVote={closeCreateVote}>
					<div className="pt-5">
						<form className=" bg-white w-2/6 mx-auto p-8 z-50">
							<h2 className="text-3xl pb-5">Create your election</h2>
							{message && (
								<p className="text-lg text-center bg-red-600 p-3 text-white">
									{message}
								</p>
							)}

							<div className="my-4">
								<label className="text-lg my-8">Election name</label>
								<CustomInput
									nameValue={"election_name"}
									value={data.election_name}
									handleChange={handleChange}
									type="text"
								/>
							</div>
							<div>
								<label>Election description</label>
								<textarea
									value={data.election_description}
									name="election_description"
									onChange={handleChange}
									className="w-full my-1 border border-gray-300 outline-gray-400 p-3 rounded-md h-40"
								></textarea>
							</div>
							<div className="my-4">
								<CustomButton
									buttonText={"Create vote"}
									handleClick={createElection}
									backgroundColor={"orange"}
								/>
							</div>
						</form>
					</div>
				</Modal>
			</div>
			<div className="">
				<Navigation />
				<Tab />
			</div>
			<div
				className="mx-auto w-11/12  my-6 py-5 relative"
				style={{ height: 620 }}
			>
				<div className="absolute right-4 w-52">
					<CustomButton
						buttonText={"Create new election"}
						handleClick={displayCreateVote}
						backgroundColor={"orange"}
					/>
				</div>
				<div className="w-full mx-auto grid grid-cols-3 mt-20">
					{category &&
						category.map((item) => (
							<div key={item.id} className="my-5 ">
								<div className="w-11/12  mx-auto py-4 cursor-pointer bg-white shadow rounded-lg">
									<h3 className="text-center py-2">
										{item.election_name}
									</h3>
									<p className="text-center py-5">
										{item.election_description}
									</p>
									<div className="w-5/6 mx-auto">
										<Link to={`categories/${item.id}`}>
											<CustomButton
												buttonText={"View election"}
												backgroundColor={"#00ADEE"}
											/>
										</Link>
									</div>
								</div>
							</div>
						))}
					{category.length < 1 ? (
						<div className="w-full text-center py-24">
							<h1 className="text-6xl">No votes created</h1>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Admin;
