import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="app-layout"> 
    <Navbar setIsOpen={setIsSidebarOpen} /> 
      <div className="app-content"> 
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> 
        <main className={`pt-16 transition-all duration-300 ${ isSidebarOpen ? "ml-64" : "ml-0" }`} > 
          <Outlet /> 
        </main> 
      </div> 
    </div>
  );
}

export default AppLayout;