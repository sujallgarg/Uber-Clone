import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RideMap from '../components/RideMap'
import { RideContext } from '../context/RideContext'
import { getPositionOnRoute } from '../utils/mapApi'

const RideTracking = () => {
  const navigate = useNavigate()
  const {
    pickup,
    destination,
    driver,
    routePoints,
    pickupCoords,
    destCoords,
    driverPosition,
    setDriverPosition,
    ridePhase,
    setRidePhase,
  } = useContext(RideContext)
  const [message, setMessage] = useState('')
  const [eta, setEta] = useState(driver.eta)

  const [prevDriverEta, setPrevDriverEta] = useState(driver.eta)
  if (driver.eta !== prevDriverEta) {
    setPrevDriverEta(driver.eta)
    setEta(driver.eta)
  }

  useEffect(() => {
    if (ridePhase !== 'arriving') {
      setRidePhase('arriving')
    }
  }, [ridePhase, setRidePhase])

  useEffect(() => {
    if (ridePhase !== 'arriving' || !routePoints.length) return

    const duration = 8000
    const start = Date.now()
    let frameId

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1) * 0.35
      setDriverPosition(getPositionOnRoute(routePoints, progress))
      setEta(Math.max(1, Math.ceil(driver.eta * (1 - progress / 0.35))))

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick)
      } else {
        setRidePhase('onboard')
        setEta(0)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [ridePhase, routePoints, driver.eta, setDriverPosition, setRidePhase])

  useEffect(() => {
    if (ridePhase !== 'ongoing' || !routePoints.length) return

    const duration = 14000
    const start = Date.now()
    let frameId

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = 0.35 + Math.min(elapsed / duration, 1) * 0.65
      setDriverPosition(getPositionOnRoute(routePoints, progress))

      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick)
      } else {
        setRidePhase('completed')
        navigate('/ride/complete')
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [ridePhase, routePoints, setDriverPosition, setRidePhase, navigate])

  const startTrip = () => {
    setRidePhase('ongoing')
  }

  const statusLabel =
    ridePhase === 'arriving'
      ? 'Meet at the pickup point'
      : ridePhase === 'onboard'
        ? 'Driver has arrived'
        : 'On trip to destination'

  return (
    <div className='relative h-screen w-full overflow-hidden flex flex-col'>
      <div className='absolute inset-0 z-0'>
        <RideMap
          pickupCoords={pickupCoords}
          destCoords={destCoords}
          routePoints={routePoints}
          driverPosition={driverPosition}
        />
      </div>

      <div className='relative z-10 flex flex-col h-full pointer-events-none'>
        <div className='flex-1 min-h-[45%]' />

        <div className='pointer-events-auto bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.12)]'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
            <p className='font-semibold text-lg'>{statusLabel}</p>
            {ridePhase === 'arriving' && (
              <div className='bg-black text-white font-bold text-xl px-4 py-3 min-w-[72px] text-center'>
                {eta} min
              </div>
            )}
          </div>

          <div className='px-5 py-4 flex items-center gap-4'>
            <img
              src={driver.photo}
              alt={driver.name}
              className='w-14 h-14 rounded-full object-cover'
            />
            <div className='flex-1'>
              <p className='font-bold text-xl'>{driver.name}</p>
              <p className='text-gray-600 text-sm'>{driver.rating} ★</p>
            </div>
            <div className='text-right text-sm'>
              <p className='font-medium'>{driver.vehicle}</p>
              <p className='text-gray-600 font-mono'>{driver.plate}</p>
            </div>
          </div>

          <p className='px-5 pb-2 text-xs text-gray-500 truncate'>
            To {destination}
          </p>
          <p className='px-5 pb-2 text-xs text-gray-500 truncate'>
            From {pickup}
          </p>

          {ridePhase === 'onboard' && (
            <div className='px-5 pb-4'>
              <button
                type='button'
                onClick={startTrip}
                className='w-full bg-black text-white font-semibold py-4 rounded-lg'
              >
                Start trip
              </button>
            </div>
          )}

          {ridePhase === 'ongoing' && (
            <p className='px-5 pb-4 text-sm text-gray-600 text-center'>
              En route to destination…
            </p>
          )}

          {ridePhase !== 'onboard' && (
            <div className='px-5 pb-6 pt-2 flex gap-2'>
              <input
                type='text'
                placeholder='Send a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='flex-1 bg-[#eee] rounded-full px-4 py-3 text-sm focus:outline-2 focus:outline-black'
              />
              <button
                type='button'
                onClick={() => message && setMessage('')}
                className='w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shrink-0'
                aria-label='Send message'
              >
                ➤
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RideTracking
