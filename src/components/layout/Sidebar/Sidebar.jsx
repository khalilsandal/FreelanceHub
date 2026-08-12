import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({isOpen, setIsOpen}) => {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-blue-400 text-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <ul className="space-y-3 mt-12">
            <li>
              
              <NavLink to="/" className="block rounded p-2 hover:bg-blue-500" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="block rounded p-2 hover:bg-blue-500" onClick={() => setIsOpen(false)}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/blog" className="block rounded p-2 hover:bg-blue-500" onClick={() => setIsOpen(false)}>
                Blog
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
