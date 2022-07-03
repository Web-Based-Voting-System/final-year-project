import React, { useEffect, useState } from "react";
import Candidate from "../../../Components/Auth/Candidate";
import Navigation from "../../../Components/Auth/Navigation";
import Tab from "../../../Components/Auth/Tab";
import CustomSearchInput from "../../../Components/Customs/CustomSearchInput";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotingResultsCategory = () => {
	const [category, setcategory] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios
				.get(`http://localhost:8081/users/category/${id}`)
				.then(({ data }) => {
					setcategory(data);
				});
		}

		return () => {};
	}, [id]);
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
				<div className="w-11/12 mx-auto">
					<h3 className="text-center my-10 text-xl">
						Results categories
					</h3>
					{category &&
						category.map((item) => (
							<div key={item.id}>
								<Candidate
									candidateTitle={item.category_name}
									id={item.id}
									buttonText={"View results"}
									link={`/results/categories/candidates/${item.id}`}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default VotingResultsCategory;
