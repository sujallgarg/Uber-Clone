import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RideMap from '../components/RideMap'
import { RideContext } from '../context/RideContext'

const FindingDriver = () => {
  const navigate = useNavigate()
  const { pickup, pickupCoords, destCoords, routePoints, setRidePhase } =
    useContext(RideContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRidePhase('arriving')
      navigate('/ride/tracking')
    }, 3500)
    return () => clearTimeout(timer)
  }, [navigate, setRidePhase])

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <div className='absolute inset-0 z-0 opacity-60'>
        <RideMap
          pickupCoords={pickupCoords}
          destCoords={destCoords}
          routePoints={routePoints}
          interactive={false}
        />
      </div>

      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center px-6 bg-white/40'>
        <h2 className='text-2xl font-semibold text-center mb-8'>
          Looking for nearby drivers
        </h2>
        <div className='relative w-48 h-32 flex items-center justify-center'>
          <div className='absolute w-32 h-32 rounded-full bg-black/5 animate-ping' />
          <div className='absolute w-24 h-24 rounded-full bg-black/10 animate-pulse' />
          <span className='text-7xl relative z-10 animate-bounce'>🚗</span>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-2xl px-5 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.12)]'>
        <div className='flex items-start gap-3'>
          <span className='w-3 h-3 rounded-sm bg-black mt-1.5 shrink-0' />
          <p className='text-sm font-medium leading-snug'>{pickup}</p>
        </div>
      </div>
    </div>
  )
}

export default FindingDriver
