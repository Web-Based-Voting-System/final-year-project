import React, { useEffect, useState } from "react";
import Candidate from "../../Components/Auth/Candidate";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import CustomSearchInput from "../../Components/Customs/CustomSearchInput";
import CustomButton from "../../Components/Customs/CustomButton";
import CustomInput from "../../Components/Customs/CustomInput";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../Components/Auth/Modal";

const ElectionCategory = () => {
	const [category, setcategory] = useState([]);
	const [visibilities, setvisibilities] = useState(false);
	const { id } = useParams();

	const [data, setdata] = useState({
		election_type_id: id,
		category_name: "",
		category_description: "",
	});
	const [message, setmessage] = useState("");

	const handleChange = (e) => {
		setdata({
			...data,
			[e.target.name]: e.target.value,
		});
		setmessage("");
	};

	const createVote = (e) => {
		e.preventDefault();
		if (data.student_id === "" || data.password === "") {
			setmessage("Can not be empty");
		}

		axios
			.post("http://localhost:8081/admin/create-category", data)
			.then(({ data }) => {
				setmessage(data);
				setdata("");
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios
				.get(`http://localhost:8081/admin/category/${id}`)
				.then(({ data }) => {
					setcategory(data);
				});
		}

		return () => {
			mounted = false;
		};
	}, [category, id]);

	const displayCreateVote = () => {
		setvisibilities(true);
	};

	const closeCreateVote = () => {
		setvisibilities(false);
	};

	return (
		<div className="w-full bg-[#F7F8FC] h-screen overflow-y-scroll">
			<div
				className={`w-screen h-screen bg-[#d1d3dc99] fixed z-40  ${
					visibilities ? "" : "hidden"
				} `}
			>
				<Modal closeCreateVote={closeCreateVote}>
					<div className="pt-10">
						<form className=" bg-white w-2/6 mx-auto p-8 z-50">
							<h2 className="text-3xl pb-5">
								Add category to this election
							</h2>
							<p className="text-lg pb-3">{message && message}</p>

							<div className="my-4">
								<label className="text-lg my-8">
									Category name
								</label>
								<CustomInput
									nameValue={"category_name"}
									value={data.category_name}
									handleChange={handleChange}
									type="text"
								/>
							</div>
							<div>
								<label>Category description</label>
								<textarea
									value={data.category_description}
									name="category_description"
									onChange={handleChange}
									className="w-full my-1 border border-gray-300 outline-gray-400 p-3 rounded-md h-40"
								></textarea>
							</div>
							<div className="my-4">
								<CustomButton
									buttonText={"Create vote"}
									handleClick={createVote}
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
				className="w-5/6 mx-auto my-6 py-5 overflow-y-scroll relative"
				style={{ height: 620 }}
			>
				<div className="absolute top-32 right-16">
					<div className="flex w-full ">
						<div className="w-52">
							<CustomButton
								buttonText={"Create new category"}
								handleClick={displayCreateVote}
								backgroundColor={"orange"}
							/>
						</div>
					</div>
				</div>
				<div className="w-3/6 mx-auto mb-40">
					<CustomSearchInput placeholder={"Search for category"} />
				</div>
				<div className="w-11/12 mx-auto">
					{category &&
						category.map((item) => (
							<div key={item.id}>
								<Candidate
									candidateTitle={item.category_name}
									candidateDetails={item.category_desc}
									link={`../categories/candidates/${item.id}`}
									buttonText={"View category"}
								/>
							</div>
						))}

					{category.length < 1 ? (
						<div className="text-center py-24">
							<h1 className="text-6xl">No votes created</h1>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ElectionCategory;
