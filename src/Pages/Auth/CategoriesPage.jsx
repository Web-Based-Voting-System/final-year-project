import React from "react";
import Candidate from "../../Components/Auth/Candidate";
import Navigation from "../../Components/Auth/Navigation";
import Tab from "../../Components/Auth/Tab";
import CustomSearchInput from "../../Components/Customs/CustomSearchInput";

const CategoriesPage = () => {
	return (
		<div className="w-full bg-[#F7F8FC] h-screen">
			<div className="">
				<Navigation />
				<Tab />
			</div>
			<div className="w-5/6 mx-auto bg-white my-6 py-5 overflow-y-scroll" style={{height: 620}}>
				<div className="w-3/6 mx-auto mb-12">
					<CustomSearchInput placeholder={'Search for category'} />
				</div>
				<div className="w-11/12 mx-auto">
					<Candidate candidateTitle={'President'} />
					<Candidate candidateTitle={'Vice President'} />
					<Candidate candidateTitle={'General Secretary'} />
					<Candidate candidateTitle={'Public Relations Officer'} />
					<Candidate candidateTitle={'Womens Commisioner'} />
					<Candidate candidateTitle={'Department Womens Commisoner'} />
					<Candidate candidateTitle={'Public Relations Officer'} />
					<Candidate candidateTitle={'Womens Commisioner'} />
					<Candidate candidateTitle={'Department Womens Commisoner'} />
				</div>
			</div>
		</div>
	);
};

export default CategoriesPage;
