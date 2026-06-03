import React, { useState, useMemo, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RideContext } from '../context/RideContext'
import { UBER_LOGO } from '../constants/map'
import RideMap from '../components/RideMap'

const LOCATION_SUGGESTIONS = [
  '562/11-A, Kaikondrahalli, Bengaluru, Karnataka',
  'Connaught Place, New Delhi',
  'India Gate, New Delhi',
  'Cyber Hub, Gurugram',
  'Saket Metro Station, New Delhi',
  'IGI Airport Terminal 3, New Delhi',
]

const UserMain = () => {
  const navigate = useNavigate()
  const { setTrip, tripLoading, pickupCoords, destCoords, routePoints } =
    useContext(RideContext)
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [activeField, setActiveField] = useState(null)

  const isExpanded = activeField !== null
  const activeValue = activeField === 'pickup' ? pickup : destination

  const filteredSuggestions = useMemo(() => {
    const query = activeValue.trim().toLowerCase()
    if (!query) return LOCATION_SUGGESTIONS
    return LOCATION_SUGGESTIONS.filter((place) =>
      place.toLowerCase().includes(query)
    )
  }, [activeValue])

  const startRide = async () => {
    if (!pickup.trim() || !destination.trim() || tripLoading) return
    await setTrip({
      pickup: pickup.trim(),
      destination: destination.trim(),
    })
    navigate('/ride/select')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    startRide()
  }

  const closePanel = () => setActiveField(null)

  const selectSuggestion = async (place) => {
    if (activeField === 'pickup') {
      setPickup(place)
      setActiveField('destination')
    } else if (activeField === 'destination') {
      setDestination(place)
      setActiveField(null)
      if (pickup.trim()) {
        await setTrip({ pickup: pickup.trim(), destination: place })
      }
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          isExpanded ? 'opacity-20' : 'opacity-100'
        }`}
      >
        {pickupCoords && destCoords ? (
          <RideMap
            pickupCoords={pickupCoords}
            destCoords={destCoords}
            routePoints={routePoints}
            interactive={!isExpanded}
          />
        ) : (
          <RideMap interactive={!isExpanded} />
        )}
      </div>

      <Link
        to='/'
        className={`absolute top-4 left-4 z-20 transition-opacity duration-300 ${
          isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <img src={UBER_LOGO} alt='Uber logo' className='w-12 h-12' />
      </Link>

      {!isExpanded && (
        <div className='absolute top-4 right-4 z-20 flex gap-2'>
          <Link
            to='/user/wallet'
            className='bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg shadow'
          >
            Wallet
          </Link>
          {localStorage.getItem('token') && (
            <Link
              to='/user/logout'
              className='bg-black text-white text-sm font-semibold px-4 py-2 rounded-lg'
            >
              Logout
            </Link>
          )}
        </div>
      )}

      <div
        className={`absolute left-0 right-0 z-10 transition-all duration-500 ease-in-out ${
          isExpanded ? 'top-0 bottom-0' : 'bottom-0'
        }`}
      >
        <div
          className={`bg-white w-full flex flex-col transition-all duration-500 ease-in-out shadow-[0_-4px_20px_rgba(0,0,0,0.15)] ${
            isExpanded
              ? 'h-full rounded-none px-5 pt-14 pb-6'
              : 'rounded-t-2xl px-5 pt-6 pb-8'
          }`}
        >
          {isExpanded && (
            <button
              type='button'
              onClick={closePanel}
              className='absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#eee] text-xl font-semibold'
              aria-label='Go back'
            >
              ←
            </button>
          )}

          <h4
            className={`text-2xl font-semibold transition-all duration-300 ${
              isExpanded ? 'mb-6 mt-2' : 'mb-4'
            }`}
          >
            {isExpanded ? 'Plan your trip' : 'Find a trip'}
          </h4>

          <form
            onSubmit={submitHandler}
            className='flex flex-col w-full max-w-md mx-auto text-lg'
          >
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-green-600' />
              <input
                type='text'
                id='pickup'
                name='pickup'
                placeholder='Add a pick-up location'
                autoComplete='street-address'
                className={`bg-[#eee] pl-8 p-3 rounded-lg w-full focus:outline-2 focus:outline-black transition-all duration-300 ${
                  activeField === 'pickup' ? 'ring-2 ring-black mb-1' : 'mb-3'
                }`}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={() => setActiveField('pickup')}
                required
              />
            </div>

            {isExpanded && activeField === 'pickup' && (
              <ul className='mb-4 max-h-48 overflow-y-auto animate-[fadeIn_0.3s_ease-out]'>
                {filteredSuggestions.map((place) => (
                  <li key={place}>
                    <button
                      type='button'
                      onClick={() => selectSuggestion(place)}
                      className='w-full text-left py-3 px-2 border-b border-gray-100 hover:bg-gray-50 text-base flex items-center gap-3'
                    >
                      <span className='text-gray-400'>📍</span>
                      {place}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-sm bg-black' />
              <input
                type='text'
                id='destination'
                name='destination'
                placeholder='Enter your destination'
                className={`bg-[#eee] pl-8 p-3 rounded-lg w-full focus:outline-2 focus:outline-black transition-all duration-300 ${
                  activeField === 'destination'
                    ? 'ring-2 ring-black mb-1'
                    : isExpanded
                      ? 'mb-0'
                      : 'mb-4'
                }`}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setActiveField('destination')}
                required
              />
            </div>

            {isExpanded && activeField === 'destination' && (
              <ul className='mt-2 flex-1 overflow-y-auto animate-[fadeIn_0.3s_ease-out]'>
                {filteredSuggestions.map((place) => (
                  <li key={place}>
                    <button
                      type='button'
                      onClick={() => selectSuggestion(place)}
                      className='w-full text-left py-3 px-2 border-b border-gray-100 hover:bg-gray-50 text-base flex items-center gap-3'
                    >
                      <span className='text-gray-400'>📍</span>
                      {place}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!isExpanded && (
              <button
                type='submit'
                disabled={tripLoading}
                className='bg-black text-white font-semibold py-3 rounded-lg w-full mt-1 disabled:opacity-60'
              >
                {tripLoading ? 'Loading route…' : 'Find a ride'}
              </button>
            )}
          </form>

          {isExpanded && pickup && destination && !activeField && (
            <button
              type='button'
              onClick={startRide}
              disabled={tripLoading}
              className='bg-black text-white font-semibold py-3 rounded-lg w-full max-w-md mx-auto mt-6 disabled:opacity-60'
            >
              {tripLoading ? 'Loading route…' : 'Find a ride'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMain
