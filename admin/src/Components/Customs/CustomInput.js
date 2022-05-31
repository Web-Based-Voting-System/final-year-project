import React from "react";

const CustomInput = ({ placeholder, handleChange, value, nameValue, type }) => {
	return (
		<input
			type={type}
			className="w-full my-1 h-12 border border-gray-300 outline-gray-400 pl-3 rounded-md"
			placeholder={placeholder}
			onChange={handleChange}
			value={value}
			name={nameValue}
		/>
	);
};

export default CustomInput;
