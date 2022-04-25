import React from 'react'

const CustomButton = ({buttonText, handleClick}) => {
  return (
    <button className='w-full bg-[#00ADEE] h-12 rounded-md text-white' onClick={handleClick}>
          {buttonText}
    </button>
  )
}

export default CustomButton