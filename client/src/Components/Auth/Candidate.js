import React from "react";
import CustomButton from "../Customs/CustomButton";
import { Link } from "react-router-dom";

const Candidate = ({ candidateTitle, buttonText, link}) => {
	return (
		<div className="flex justify-between items-center border-b py-2 mt-4 px-4">
			<h3>{candidateTitle}</h3>
			<div className="w-1/6">
				<Link to={link}>
					{" "}
					<CustomButton buttonText={buttonText} />
				</Link>
			</div>
		</div>
	);
};

export default Candidate;
