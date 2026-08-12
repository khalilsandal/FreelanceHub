import React from 'react'
import { NavLink } from "react-router-dom";
import HamburgerButton from "./HamburgerButton.jsx";

const Navbar = ({setIsOpen}) => {
  return (
<nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow">
  <div className="flex h-full items-center px-6">
    <div className="flex items-center gap-4"> 
      <HamburgerButton onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)} /> 
      
      <NavLink to="/" className="text-xl font-bold text-gray-900">
        Freelance Hub
      </NavLink>
    </div>

    <div className="ml-auto flex items-center gap-3">
      <NavLink to="/login" className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100" > 
      Login 
      </NavLink>

      <NavLink to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Register
      </NavLink>
    </div>
  </div>
</nav>

  )
}

export default Navbar