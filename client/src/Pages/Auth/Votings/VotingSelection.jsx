import React, { useEffect, useState } from "react";
import Navigation from "../../../Components/Auth/Navigation";
import Tab from "../../../Components/Auth/Tab";
import CustomSearchInput from "../../../Components/Customs/CustomSearchInput";
import axios from "axios";
import CustomButton from "../../../Components/Customs/CustomButton";
import { Link } from "react-router-dom";

const VotingSelection = () => {
	const [category, setcategory] = useState([]);

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios.get("http://localhost:8081/votetype").then(({ data }) => {
				setcategory(data);
			});
		}

		return () => {};
	}, []);
	return (
		<div className="w-full bg-[#F7F8FC] h-screen">
			<div className="">
				<Navigation />
				<Tab />
			</div>
			<div
				className="w-5/6 mx-auto bg-white my-6 py-5 overflow-y-scroll"
				style={{ height: 620 }}
			>
				<div className="w-3/6 mx-auto mb-12">
					<CustomSearchInput placeholder={"Search for category"} />
				</div>
				<h3 className="text-center my-10 text-xl">Kindly select the election to vote</h3>
				<div className="w-11/12 mx-auto  grid grid-cols-2">
					{category &&
						category.map((item) => (
							<div key={item.id}  className="my-5">
								<div className="w-11/12 mx-auto py-3 cursor-pointer border shadow rounded-lg">
									<h3 className="text-center py-5">
										{item.vote_name}
									</h3>
									<div className="w-5/6 mx-auto">
										<Link to={`categories/${item.id}`}>
											<CustomButton
												buttonText={"View election"}
											/>
										</Link>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default VotingSelection;
