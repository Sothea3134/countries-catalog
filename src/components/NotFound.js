import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
      <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">Countries Not Found</p>
      <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, the countries you are looking for could not be found.</p>
    </div>
  )
}
