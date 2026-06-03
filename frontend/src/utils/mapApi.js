import { LOCATION_COORDS, DEFAULT_CENTER } from '../constants/locations'

export async function geocodeAddress(address) {
  const trimmed = address?.trim()
  if (!trimmed) return DEFAULT_CENTER

  if (LOCATION_COORDS[trimmed]) {
    return LOCATION_COORDS[trimmed]
  }

  const partial = Object.entries(LOCATION_COORDS).find(([key]) =>
    key.toLowerCase().includes(trimmed.toLowerCase()) ||
    trimmed.toLowerCase().includes(key.toLowerCase().slice(0, 12))
  )
  if (partial) return partial[1]

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(trimmed)}&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    if (data?.[0]) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)]
    }
  } catch {
    /* use default */
  }

  return DEFAULT_CENTER
}

export async function fetchRoute(pickupCoords, destCoords) {
  const [lat1, lon1] = pickupCoords
  const [lat2, lon2] = destCoords

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`
    const res = await fetch(url)
    const data = await res.json()

    if (data.code === 'Ok' && data.routes?.[0]?.geometry?.coordinates) {
      return data.routes[0].geometry.coordinates.map(([lon, lat]) => [lat, lon])
    }
  } catch {
    /* fallback line */
  }

  return [pickupCoords, destCoords]
}

/** Interpolate position along route by progress 0–1 */
export function getPositionOnRoute(routePoints, progress) {
  if (!routePoints?.length) return DEFAULT_CENTER
  if (routePoints.length === 1) return routePoints[0]

  const clamped = Math.max(0, Math.min(1, progress))
  const index = clamped * (routePoints.length - 1)
  const i = Math.floor(index)
  const t = index - i

  if (i >= routePoints.length - 1) return routePoints[routePoints.length - 1]

  const [lat1, lon1] = routePoints[i]
  const [lat2, lon2] = routePoints[i + 1]
  return [lat1 + (lat2 - lat1) * t, lon1 + (lon2 - lon1) * t]
}

export function getBoundsFromPoints(points) {
  if (!points?.length) return null
  const lats = points.map((p) => p[0])
  const lngs = points.map((p) => p[1])
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ]
}
