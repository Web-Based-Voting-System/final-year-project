import React from 'react'

const CustomSearchInput = ({placeholder}) => {
  return (
      <input
            type="text"
            className="w-full my-1 h-12 outline-gray-400 pl-3 rounded-md bg-gray-100 border"
            placeholder={placeholder}
      />
  )
}

export default CustomSearchInput