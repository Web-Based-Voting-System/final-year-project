import React from "react";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import Candidate1 from "../../Assets/Images/2.png";
import Candidate2 from "../../Assets/Images/3.png";
import Candidate3 from "../../Assets/Images/4.png";
import Candidate4 from "../../Assets/Images/5.png";
import CustomSearchInput from "../../Components/Customs/CustomSearchInput";
import CandidateResultCard from "../../Components/Auth/CandidateResultCard";

const VotingResultsPage = () => {
	return (
		<div className="w-full bg-[#F7F8FC] pb-16 relative">
			<div className="">
				<Navigation />
				<Tab />
				<div className="w-3/6 mx-auto mb-12">
					<CustomSearchInput placeholder={"Search for category"} />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 w-5/6 mx-auto my-20">
				<CandidateResultCard
					Candidate1={Candidate1}
					Category={"President"}
					CandidateName={"Frank Kwabena Abrokwa"}
				/>
				<CandidateResultCard Candidate1={Candidate2}
					Category={"Vice President"}
					CandidateName={"Kwabena Abrokwa"} />
				<CandidateResultCard Candidate1={Candidate3}
					Category={"President"}
					CandidateName={"Frank Kwabena Abrokwa"} />
				<CandidateResultCard Candidate1={Candidate4}
					Category={"President"}
					CandidateName={"Frank Kwabena Abrokwa"} />
			</div>
		</div>
	);
};

export default VotingResultsPage;
