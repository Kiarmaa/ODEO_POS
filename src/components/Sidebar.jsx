import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css'; 


function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/tables" className="tab-button">
        Tables
      </NavLink>
      <NavLink to="/kitchen" className="tab-button">
        Kitchen
      </NavLink>
      <NavLink to="/checked-out" className="tab-button">
        Checked-Out Orders
      </NavLink>
    </div>
  );
}

export default Sidebar;
