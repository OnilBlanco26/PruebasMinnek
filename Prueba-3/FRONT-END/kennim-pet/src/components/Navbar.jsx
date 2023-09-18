import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const { id } = useSelector(state => state.auth);

  
  return (
    <>
      <h1 className="app-title">Vislumbre de maravillas</h1>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2 className="navbar-title">MINNEK</h2>
          <img className="navbar-icon" src="/pet-house.png" alt="logo" />
        </div>
        {
     id > 0 ? (
      <div className="navbar-links">
         <NavLink className="nav-item" activeClassName="link-active" to="/dogs/create">
            Create Dog
          </NavLink>
          <NavLink className="nav-item" activeClassName="link-active" to="/dogs/table">
            Table
          </NavLink>
          <NavLink className="nav-item" activeClassName="link-active" to="/dogs/home">
            Home
          </NavLink>
        </div>
     ) : null
    }
        
      </nav>
    </>
  );
};

export default Navbar;
