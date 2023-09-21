import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../redux/actions/auth';

const Navbar = () => {

  const { id } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(startLogout());
  };

  
  return (
    <>
      <h1 className="app-title">Glimpse of wonders</h1>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2 className="navbar-title">MINNEK</h2>
          <img className="navbar-icon" src="/pet-house.png" alt="logo" />
        </div>
        {
     id > 0 ? (
      <div className="navbar-links">
          <span className='log-btn' onClick={logout}>
            Logout
          </span>
          <NavLink className="nav-item" to="/dogs/home">
            Home
          </NavLink>
          <NavLink className="nav-item" to="/dogs/table">
            Table
          </NavLink>
         <NavLink className="nav-item" to="/dogs/create">
            Create Dog
          </NavLink>
        </div>
     ) : null
    }
        
      </nav>
    </>
  );
};

export default Navbar;
