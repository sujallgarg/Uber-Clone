import React, { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { DEFAULT_CENTER } from '../constants/locations'
import { getBoundsFromPoints } from '../utils/mapApi'

const driverIcon = L.divIcon({
  className: 'driver-marker',
  html: '<div style="font-size:28px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))">🚗</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

function FitBounds({ points }) {
  const map = useMap()
  const bounds = useMemo(() => getBoundsFromPoints(points), [points])

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 })
    }
  }, [map, bounds])

  return null
}

const RideMap = ({
  pickupCoords,
  destCoords,
  routePoints = [],
  driverPosition = null,
  className = 'h-full w-full',
  interactive = true,
}) => {
  const allPoints = useMemo(() => {
    const pts = []
    if (pickupCoords) pts.push(pickupCoords)
    if (destCoords) pts.push(destCoords)
    if (driverPosition) pts.push(driverPosition)
    if (routePoints.length) pts.push(...routePoints)
    return pts
  }, [pickupCoords, destCoords, driverPosition, routePoints])

  const center = pickupCoords || destCoords || DEFAULT_CENTER

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={13}
        className='h-full w-full z-0'
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={interactive}
        attributionControl={false}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {allPoints.length > 0 && <FitBounds points={allPoints} />}

        {routePoints.length > 1 && (
          <Polyline
            positions={routePoints}
            pathOptions={{ color: '#000', weight: 5, opacity: 0.85 }}
          />
        )}

        {pickupCoords && (
          <CircleMarker
            center={pickupCoords}
            radius={9}
            pathOptions={{
              color: '#16a34a',
              fillColor: '#22c55e',
              fillOpacity: 1,
              weight: 3,
            }}
          />
        )}

        {destCoords && (
          <CircleMarker
            center={destCoords}
            radius={9}
            pathOptions={{
              color: '#000',
              fillColor: '#000',
              fillOpacity: 1,
              weight: 3,
            }}
          />
        )}

        {driverPosition && (
          <Marker position={driverPosition} icon={driverIcon} />
        )}
      </MapContainer>
    </div>
  )
}

export default RideMap
