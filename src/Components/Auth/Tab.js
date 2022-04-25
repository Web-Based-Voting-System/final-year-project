import React from "react";
import { Link } from "react-router-dom";

const Tab = () => {
	return (
		<div className="my-6 w-4/6 bg-blue-100 rounded-lg mx-auto">
			<div className="flex justify-between items-center text-center py-1">
				<Link
					to={"/categories"}
					className="text-blue-400 text-sm bg-white p-2 w-1/4 rounded-lg mx-2 cursor-pointer"
				>
					Category
				</Link>
				<Link
					to={"/results"}
					className="p-2 w-1/4 rounded-lg mx-2 cursor-pointer  text-sm"
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
