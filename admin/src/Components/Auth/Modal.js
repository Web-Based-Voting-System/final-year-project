import React from "react";
import {FaCross} from 'react-icons/fa'

const Modal = ({closeCreateVote, children}) => {
	return (
		<>
			<div
				className="absolute right-10 top-10 text-6xl cursor-pointer"
				onClick={closeCreateVote}
			>
				<FaCross size={80} />
			</div>
			<div className="pt-40">
				{children}
			</div>
		</>
	);
};

export default Modal;
