import React from "react";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import Candidate1 from "../../Assets/Images/2.png";
import CandidateCard from "../../Components/Auth/CandidateCard";

const VotingResultsPerCandidate = () => {
	return (
		<div className="w-full bg-[#F7F8FC] pb-20 relative">
			<div className="fixed h-screen w-screen z-50 bg-[#d1d3dc99] bg-blur-200">
                        <div className="w-2/6 mx-auto bg-white py-10 mt-60 rounded-lg">
                              <img src={Candidate1} className="w-2/6 mx-auto" alt="Success" />
                              <p className="text-center py-8">Jessie Reed thanks for voting</p>
                              <button className="mx-auto block border py-2 px-9 rounded-xl">Go home</button>
                        </div>
                  </div>
			<div className="">
				<Navigation />
				<Tab />
			</div>
			<div className="grid grid-cols-3 gap-4 w-5/6 mx-auto my-20">
				<CandidateCard Candidate={Candidate1} />
				<CandidateCard Candidate={Candidate1} />
				<CandidateCard Candidate={Candidate1} />
				<CandidateCard Candidate={Candidate1} />
				<CandidateCard Candidate={Candidate1} />
				<CandidateCard Candidate={Candidate1} />
			</div>
		</div>
	);
};

export default VotingResultsPerCandidate;
