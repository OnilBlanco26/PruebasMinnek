import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <h2 className="navbar-title">MINNEK</h2>
      <img className="navbar-icon" src="/pet-house.png" alt="logo" />
      </div>
      <div className={`navbar-links`}>
      <NavLink className={(isActive) => `nav-item ${ isActive ? 'active link-active' : ''}`} to="/dog-list">
        Table
      </NavLink>
      <NavLink className={(isActive) => `nav-item ${ isActive ? 'active link-active' : ''}`} to="/home">
        Home
      </NavLink>
      </div>
      
    </nav>
  );
};

export default Navbar;
