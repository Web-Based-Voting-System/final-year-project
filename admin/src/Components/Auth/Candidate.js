import React from "react";
import CustomButton from "../Customs/CustomButton";
import { Link } from "react-router-dom";

const Candidate = ({ candidateTitle, candidateDetails, buttonText, link }) => {
	return (
		<div className="flex justify-between items-center border-b py-2 mt-4 px-4">
			<div className="w-3/6">
				<h3 className="text-2xl py-1">{candidateTitle}</h3>
				<p className="text-gray-500">{candidateDetails}</p>
			</div>
			<div className="w-1/6">
				<Link to={link}>
					{" "}
					<CustomButton
						buttonText={buttonText}
						backgroundColor={"#00ADEE"}
					/>
				</Link>
			</div>
		</div>
	);
};

export default Candidate;
