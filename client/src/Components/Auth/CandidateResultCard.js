import React from 'react'

const CandidateResultCard = ({Candidate1, Category, CandidateName}) => {
  return (
      <div className="mx-auto" style={{height: 390, width: '480px'}}>
            <img
                  src={Candidate1}
                  alt="Candidate"
                  className="w-full"
                  style={{height: '320px'}}
            />
            <p className="pt-4 text-lg">{Category}</p>
            <p className="text-md text-gray-400">{CandidateName}</p>
      </div>
  )
}

export default CandidateResultCard