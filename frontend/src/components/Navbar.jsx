import React, { useState } from 'react';
import SidebarContent from './SidebarContent';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile drawer - visible on small screens */}
      <div className=" drawer lg:hidden">
        <input 
          id="navbar-drawer" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={drawerOpen}
          onChange={(e) => setDrawerOpen(e.target.checked)}
        />
        <div className="drawer-content">
          {/* Mobile navbar toggle button */}
          <div className="fixed top-0 left-0 z-10 p-4">
            <label htmlFor="navbar-drawer" className="btn btn-square btn-ghost drawer-button text-base-content">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
        </div>
        <div className="drawer-side z-20">
          <label htmlFor="navbar-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={closeDrawer}></label>
          <div className="w-64 min-h-full">
            <SidebarContent onItemClick={closeDrawer} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar - hidden on small screens */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 border-r border-base-300 shadow-sm">
        <SidebarContent />
      </div>
    </>
  );
};

export default Navbar;