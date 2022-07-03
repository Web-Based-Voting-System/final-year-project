import React, { useEffect, useState } from "react";
import Navigation from "../../../Components/Auth/Navigation";
import { useParams } from "react-router-dom";
import Tab from "../../../Components/Auth/Tab";
import CandidateCard from "../../../Components/Auth/CandidateCard";
import axios from "axios";

const VotingResultsPage = () => {
	const [candidate, setcandidate] = useState([]);
	const [noOfVote, setnoOfVote] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios
				.get(`http://localhost:8081/users/candidate/${id}`)
				.then(({ data }) => {
					setcandidate(data);
				});

			axios
				.get(`http://localhost:8081/users/votesCounts/${id}`)
				.then(({ data }) => {
					setnoOfVote(data);
				});
		}

		return () => {
			mounted = false;
		};
	}, [id]);

	return (
		<div className="w-full bg-[#F7F8FC] pb-20 relative">
			<div className="">
				<Navigation />
				<Tab />
			</div>
			<div className="grid grid-cols-3 gap-4 w-5/6 mx-auto my-20">
				{candidate &&
					candidate.map((item) => (
						<div key={item.id}>
							<CandidateCard
								candidateName={item.candidate_name}
								candidateImage={item.img}
								numberOfVotes={`Number of votes votes : ${
									noOfVote.filter(
										(items) =>
											items.candidate_id === item.id
									).length
								}`}
								buttonText={"View candidate profile"}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default VotingResultsPage;
