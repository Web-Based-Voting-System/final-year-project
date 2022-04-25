import React from "react";

const CustomInput = ({placeholder}) => {
	return (
		<input
			type="text"
			className="w-full my-1 h-12 border border-gray-300 outline-gray-400 pl-3 rounded-md"
                  placeholder={placeholder}
		/>
	);
};

export default CustomInput;
