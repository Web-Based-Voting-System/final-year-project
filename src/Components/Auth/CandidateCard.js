import React from "react";
import CustomButton from "../Customs/CustomButton";

const CandidateCard = ({ Candidate, handleClick }) => {
	return (
		<div className="mx-auto w-64 h-96">
			<img src={Candidate} alt="Candidate" className="w-full h-64 mx-auto" />
			<p className="text-center py-4">Frank Kwabena Abrokwa</p>
			<CustomButton buttonText={"Vote for candidate"} handleClick={handleClick} />
		</div>
	);
};

export default CandidateCard;
