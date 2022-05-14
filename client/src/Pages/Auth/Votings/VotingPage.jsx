import React, { useEffect, useState } from "react";
import Navigation from "../../../Components/Auth/Navigation";
import { useParams } from "react-router-dom";
import Tab from "../../../Components/Auth/Tab";
import CandidateCard from "../../../Components/Auth/CandidateCard";
import axios from "axios";

const VotingPage = () => {
	const [modal, setmodal] = useState(true);
	const [candidate, setcandidate] = useState([]);
	const [message, setmessage] = useState("");
	const [candidateImage, setcandidateImage] = useState("");

	const { id } = useParams();

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			axios
				.get(`http://localhost:8081/candidate/${id}`)
				.then(({ data }) => {
					setcandidate(data);
				});
		}

		return () => {
			mounted = false;
		};
	}, [id]);

	const student_id = localStorage.getItem("user_id");

	const handleClick = (candidate, candidatePerImage) => {
		axios
			.post("http://localhost:8081/vote", {
				candidate_id: candidate,
				category_id: id,
				user_id: student_id,
			})
			.then(({ data }) => {
				setmessage(data);
				setcandidateImage(candidatePerImage);
				setmodal(false);
			})
			.catch((error) => {
				console.log(error);
			});
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
					{candidateImage && (
						<img
							src={require(`../../../Assets/Images/${candidateImage}`)}
							className="w-2/6 mx-auto"
							alt="Success"
						/>
					)}
					{message && <p className="text-center py-8">{message}</p>}
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
				{candidate &&
					candidate.map((item) => (
						<div key={item.id}>
							<CandidateCard
								candidateName={item.candidate_name}
								candidateImage={item.img}
								handleClick={() =>
									handleClick(item.id, item.img)
								}
								buttonText={"Vote for candidate"}
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default VotingPage;
