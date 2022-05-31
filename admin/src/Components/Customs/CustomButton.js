import React from 'react'

const CustomButton = ({buttonText, handleClick, backgroundColor}) => {
  return (
    <button className='w-full h-12 rounded-md text-white' onClick={handleClick} style={{backgroundColor: backgroundColor}}>
          {buttonText}
    </button>
  )
}

export default CustomButton