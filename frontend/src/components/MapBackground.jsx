import React from 'react'
import { MAP_IMAGE } from '../constants/map'

const MapBackground = ({ dimmed = false, className = '' }) => (
  <div
    className={`absolute inset-0 z-0 transition-opacity duration-500 ${
      dimmed ? 'opacity-40' : 'opacity-100'
    } ${className}`}
  >
    <img src={MAP_IMAGE} className='h-full w-full object-cover' alt='Map' />
  </div>
)

export default MapBackground
