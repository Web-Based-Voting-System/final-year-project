import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';

const Tab = () => {

	const location = useLocation();
	const { id } = useParams();
	
	return (
		<div className="my-6 w-3/6 bg-blue-100 rounded-lg mx-auto">
			<div className="flex justify-between items-center text-center py-1">
				<Link
					to={"/select-vote"}
					className={`${location.pathname === "/select-vote" || location.pathname === `/select-vote/categories/${id}` || location.pathname ===`/categories/candidates/${id}` ? "text-blue-400 text-sm bg-white p-2 w-1/4 rounded-lg mx-2 cursor-pointer" : "p-2 w-1/4 rounded-lg mx-2 cursor-pointer  text-sm"}`}
				>
					Votings
				</Link>
				<Link
					to={"/results"}
					className={`${location.pathname === "/results" || location.pathname === `/results/categories/${id}` || location.pathname ===`/results/categories/candidates/${id}` ? "text-blue-400 text-sm bg-white p-2 w-1/4 rounded-lg mx-2 cursor-pointer" : "p-2 w-1/4 rounded-lg mx-2 cursor-pointer  text-sm"}`}
				>
					Results
				</Link>
				<Link
					to={"/results"}
					className="p-2 w-1/4 rounded-lg mx-2 cursor-pointer  text-sm"
				>
					History
				</Link>
				<Link
					to={"/results"}
					className="p-2 w-1/4 rounded-lg mx-2 cursor-pointer  text-sm"
				>
					Upcoming Events
				</Link>
			</div>
		</div>
	);
};

export default Tab;
