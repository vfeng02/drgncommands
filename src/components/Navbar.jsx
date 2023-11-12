import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>cryoDRGN commands</h1>
      <div className="links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;