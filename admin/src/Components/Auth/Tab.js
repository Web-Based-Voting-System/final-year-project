import React from "react";
import { Link } from "react-router-dom";

const Tab = () => {
	return (
		<div className="my-6 w-3/6 bg-blue-100 rounded-lg mx-auto">
			<div className="flex justify-between items-center text-center py-1">
				<Link
					to={"/admin-page"}
					className={`text-blue-400 text-sm bg-white p-2 w-full rounded-lg mx-2 cursor-pointer`}
				>
					Create Elections
				</Link>
			</div>
		</div>
	);
};

export default Tab;
