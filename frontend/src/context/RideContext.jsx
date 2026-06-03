import React, { createContext, useState, useCallback } from 'react'
import { RIDE_OPTIONS, MOCK_DRIVER } from '../constants/rides'
import { geocodeAddress, fetchRoute } from '../utils/mapApi'

export const RideContext = createContext(null)

const RideProvider = ({ children }) => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupCoords, setPickupCoords] = useState(null)
  const [destCoords, setDestCoords] = useState(null)
  const [routePoints, setRoutePoints] = useState([])
  const [selectedRide, setSelectedRide] = useState(RIDE_OPTIONS[0])
  const [driver] = useState(MOCK_DRIVER)
  const [driverPosition, setDriverPosition] = useState(null)
  const [ridePhase, setRidePhase] = useState('idle')
  const [tripLoading, setTripLoading] = useState(false)
  const [rating, setRating] = useState(5)

  const setTrip = useCallback(async ({ pickup: p, destination: d }) => {
    setTripLoading(true)
    try {
      if (p !== undefined) setPickup(p)
      if (d !== undefined) setDestination(d)

      const [pCoords, dCoords] = await Promise.all([
        geocodeAddress(p),
        geocodeAddress(d),
      ])
      setPickupCoords(pCoords)
      setDestCoords(dCoords)

      const route = await fetchRoute(pCoords, dCoords)
      setRoutePoints(route)
      setDriverPosition(route[0] || pCoords)
      setRidePhase('planned')
    } finally {
      setTripLoading(false)
    }
  }, [])

  const resetTrip = useCallback(() => {
    setPickup('')
    setDestination('')
    setPickupCoords(null)
    setDestCoords(null)
    setRoutePoints([])
    setSelectedRide(RIDE_OPTIONS[0])
    setDriverPosition(null)
    setRidePhase('idle')
    setRating(5)
  }, [])

  return (
    <RideContext.Provider
      value={{
        pickup,
        destination,
        pickupCoords,
        destCoords,
        routePoints,
        setPickup,
        setDestination,
        setTrip,
        selectedRide,
        setSelectedRide,
        driver,
        driverPosition,
        setDriverPosition,
        ridePhase,
        setRidePhase,
        tripLoading,
        rating,
        setRating,
        resetTrip,
      }}
    >
      {children}
    </RideContext.Provider>
  )
}

export default RideProvider
