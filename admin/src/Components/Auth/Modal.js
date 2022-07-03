import React from "react";
import {FaWindowClose} from 'react-icons/fa'

const Modal = ({closeCreateVote, children}) => {
	return (
		<>
			<div
				className="absolute right-10 top-10 text-6xl cursor-pointer"
				onClick={closeCreateVote}
			>
					<FaWindowClose size={40} color={"White"} />
			</div>
			<div className="pt-32">
				{children}
			</div>
		</>
	);
};

export default Modal;
