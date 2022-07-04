import React, { useEffect, useState } from "react";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import axios from "axios";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import Modal from "../../Components/Auth/Modal";
import { useParams } from "react-router-dom";

const ElectionCandidates = () => {
	const [candidate, setcandidate] = useState([]);
	const [visibilities, setvisibilities] = useState(false);
	const { id } = useParams();

	const [data, setdata] = useState({
		category_id: id,
		candidate_name: "",
		img: "",
	});
	const [message, setmessage] = useState("");

	const handleChange = (e) => {
		setdata({
			...data,
			[e.target.name]: e.target.value,
		});
		setmessage("");
	};

	const handleImageChange = (e) => {
		setdata({
			...data,
			img: e.target.files[0],
		});
	};

	const createCandidate = (e) => {
		e.preventDefault();
		if (data.candidate_name === "" || data.img === "") {
			setmessage("All fields are required");
		} else {
			axios
				.post("http://localhost:8081/admin/create-candidate", data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then(({ data }) => {
					setmessage(data.message);
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios
				.get(`http://localhost:8081/admin/electiontype`)
				.then(({ data }) => {
					setcandidate(data);
				});
		}

		return () => {};
	}, []);

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
					<div className="pt-20">
						<form
							encType="multipart/form-data"
							method="POST"
							onSubmit={createCandidate}
							className=" bg-white w-2/6 mx-auto p-8 z-50"
						>
							<h2 className="text-3xl pb-5">Add a candidate</h2>
							{message && (
								<p className="text-lg text-center bg-red-600 p-3 text-white">
									{message}
								</p>
							)}

							<div className="my-4">
								<label className="text-lg my-8">Candidate name</label>
								<CustomInput
									nameValue={"candidate_name"}
									value={data.candidate_name}
									handleChange={handleChange}
									type="text"
								/>
							</div>
							<div>
								<label>Candidate image</label>
								<input
									type={"file"}
									name={"img"}
									accept="image/*"
									onChange={handleImageChange}
								/>
							</div>
							<div className="mt-10">
								<CustomButton
									buttonText={"Create candidate"}
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
						buttonText={"Add new candidate"}
						handleClick={displayCreateVote}
						backgroundColor={"orange"}
					/>
				</div>
				<div className="w-full mx-auto grid grid-cols-3 mt-20"></div>
			</div>
		</div>
	);
};

export default ElectionCandidates;
