import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RideContext } from '../context/RideContext'

const RideComplete = () => {
  const navigate = useNavigate()
  const {
    pickup,
    destination,
    selectedRide,
    driver,
    rating,
    setRating,
    resetTrip,
  } = useContext(RideContext)
  const [submitted, setSubmitted] = useState(false)

  const fare = selectedRide?.price?.toFixed(2) ?? '0.00'

  const finish = () => {
    resetTrip()
    navigate('/home')
  }

  const submitRating = () => {
    setSubmitted(true)
    setTimeout(finish, 1200)
  }

  return (
    <div className='min-h-screen bg-white flex flex-col'>
      <div className='flex-1 flex flex-col items-center justify-center px-6 py-10'>
        <div className='w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mb-6'>
          ✓
        </div>
        <h1 className='text-2xl font-bold mb-2'>Trip complete</h1>
        <p className='text-gray-500 text-center mb-8'>
          You arrived at your destination
        </p>

        <div className='w-full max-w-md bg-[#f5f5f5] rounded-xl p-5 mb-6'>
          <div className='flex justify-between mb-3'>
            <span className='text-gray-600'>Fare</span>
            <span className='font-bold text-xl'>₹{fare}</span>
          </div>
          <div className='text-sm text-gray-600 space-y-2 border-t border-gray-200 pt-3'>
            <p>
              <span className='text-green-600'>●</span> {pickup}
            </p>
            <p>
              <span className='text-black'>■</span> {destination}
            </p>
            <p className='text-gray-500'>
              {selectedRide?.name} · {driver.name}
            </p>
          </div>
        </div>

        {!submitted ? (
          <>
            <p className='font-semibold mb-3'>Rate your driver</p>
            <div className='flex gap-2 mb-8'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-transform ${
                    star <= rating ? 'scale-110' : 'opacity-30'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type='button'
              onClick={submitRating}
              className='w-full max-w-md bg-black text-white font-semibold py-4 rounded-lg'
            >
              Submit & done
            </button>
          </>
        ) : (
          <p className='text-green-600 font-medium'>Thanks for riding!</p>
        )}
      </div>

      <button
        type='button'
        onClick={finish}
        className='mx-5 mb-8 text-gray-500 text-sm underline'
      >
        Skip to home
      </button>
    </div>
  )
}

export default RideComplete
