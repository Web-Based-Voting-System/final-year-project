import React, { useState } from "react";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import Candidate1 from "../../Assets/Images/2.png";
import Candidate2 from "../../Assets/Images/3.png";
import Candidate3 from "../../Assets/Images/4.png";
import Candidate4 from "../../Assets/Images/5.png";
import CandidateCard from "../../Components/Auth/CandidateCard";

const VotingPage = () => {
	const [modal, setmodal] = useState(true);

	const handleClick = () => {
		setmodal(false);
	};

	const closeModal = () => {
		setmodal(true);
	};

	return (
		<div className="w-full bg-[#F7F8FC] pb-20 relative">
			<div
				className={`fixed h-screen w-screen z-50 bg-[#d1d3dc99] bg-blur-200 ${
					modal ? "hidden" : "block"
				} `}
			>
				<div className="w-2/6 mx-auto bg-white py-10 mt-60 rounded-lg">
					<img
						src={Candidate1}
						className="w-2/6 mx-auto"
						alt="Success"
					/>
					<p className="text-center py-8">
						Jessie Reed thanks for voting
					</p>
					<button
						className="mx-auto block border py-2 px-9 rounded-xl"
						onClick={closeModal}
					>
						Go home
					</button>
				</div>
			</div>
			<div className="">
				<Navigation />
				<Tab />
			</div>
			<div className="grid grid-cols-3 gap-4 w-5/6 mx-auto my-20">
				<CandidateCard
					Candidate={Candidate1}
					handleClick={handleClick}
				/>
				<CandidateCard Candidate={Candidate2} />
				<CandidateCard Candidate={Candidate3} />
				<CandidateCard Candidate={Candidate4} />
				<CandidateCard Candidate={Candidate1} />
				<CandidateCard Candidate={Candidate1} />
			</div>
		</div>
	);
};

export default VotingPage;
