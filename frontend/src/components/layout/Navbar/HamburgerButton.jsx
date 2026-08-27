import React from 'react'

const HamburgerButton = ({onClick}) => {
  return (
    <button
        onClick={onClick}
        className="left-4 z-50 rounded-lg bg-blue-400 p-3 text-white shadow-md hover:bg-blue-600"
      >
        {/* Hamburger icon */}
        <div className="space-y-1">
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </div>
      </button>
  )
}

export default HamburgerButton