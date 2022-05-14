import React from "react";
import CustomButton from "../Customs/CustomButton";

const CandidateCard = ({ candidateImage, handleClick, candidateName, buttonText, numberOfVotes}) => {
	return (
		<div className="mx-auto w-64 h-96">
			<img src={require(`../../Assets/Images/${candidateImage}`)} alt="Candidate" className="w-full h-64 mx-auto" />
			<p className="text-center py-3"> {candidateName}</p>
			<p className="text-center py-3"> {numberOfVotes}</p>
			<CustomButton buttonText={buttonText} handleClick={handleClick} />
		</div>
	);
};

export default CandidateCard;
