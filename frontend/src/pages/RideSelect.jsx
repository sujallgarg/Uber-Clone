import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import RideMap from '../components/RideMap'
import { RideContext } from '../context/RideContext'
import { RIDE_OPTIONS } from '../constants/rides'

const RideSelect = () => {
  const navigate = useNavigate()
  const {
    pickup,
    destination,
    pickupCoords,
    destCoords,
    routePoints,
    selectedRide,
    setSelectedRide,
    setRidePhase,
  } = useContext(RideContext)

  const confirmRide = () => {
    setRidePhase('finding')
    navigate('/ride/finding')
  }

  return (
    <div className='relative h-screen w-full overflow-hidden flex flex-col'>
      <div className='absolute inset-0 z-0'>
        <RideMap
          pickupCoords={pickupCoords}
          destCoords={destCoords}
          routePoints={routePoints}
        />
      </div>

      <div className='relative z-10 flex flex-col h-full pointer-events-none'>
        <div className='flex-1 min-h-[45%] relative'>
          <Link
            to='/home'
            className='pointer-events-auto absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-xl font-semibold'
          >
            ←
          </Link>
          <div className='pointer-events-auto absolute bottom-4 left-4 right-4 bg-white rounded-lg px-4 py-2 shadow-md text-sm font-medium truncate'>
            From {pickup}
          </div>
        </div>

        <div className='pointer-events-auto bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex flex-col max-h-[55%]'>
          <div className='px-5 pt-4 pb-2 border-b border-gray-100'>
            <button
              type='button'
              className='flex items-center gap-2 text-sm font-semibold bg-[#eee] px-4 py-2 rounded-full'
            >
              <span>🕐</span> Leave Now
            </button>
            <p className='text-xs text-gray-500 mt-2 truncate'>To {destination}</p>
          </div>

          <div className='overflow-y-auto flex-1 px-4 py-3 space-y-3'>
            {RIDE_OPTIONS.map((ride) => (
              <button
                key={ride.id}
                type='button'
                onClick={() => setSelectedRide(ride)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedRide?.id === ride.id
                    ? 'border-black bg-gray-50'
                    : 'border-transparent bg-[#f5f5f5]'
                }`}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <span className='text-3xl'>{ride.icon}</span>
                    <div>
                      <div className='flex items-center gap-2'>
                        <span className='font-semibold text-lg'>{ride.name}</span>
                        <span className='text-gray-500 text-sm'>👤 {ride.capacity}</span>
                      </div>
                      <p className='text-sm text-gray-600'>
                        {ride.eta} · {ride.time}
                      </p>
                      <p className='text-xs text-gray-500 mt-0.5'>{ride.description}</p>
                    </div>
                  </div>
                  <span className='font-semibold text-lg'>₹{ride.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>

          <div className='p-4 border-t border-gray-100'>
            <button
              type='button'
              onClick={confirmRide}
              className='w-full bg-black text-white font-semibold py-4 rounded-lg text-lg'
            >
              Choose {selectedRide?.name || 'UberGo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RideSelect
