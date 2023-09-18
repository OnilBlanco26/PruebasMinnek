import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <h1 className="app-title">Vislumbre de maravillas</h1>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2 className="navbar-title">MINNEK</h2>
          <img className="navbar-icon" src="/pet-house.png" alt="logo" />
        </div>
        <div className="navbar-links">
          <NavLink activeClassName="link-active" to="/dogs/table">
            Table
          </NavLink>
          <NavLink activeClassName="link-active" to="/dogs/home">
            Home
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;