import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../redux/actions/auth';
import { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const { id } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  const modalRef = useRef(null);

  const logout = () => {
    dispatch(startLogout());
  };

  const handleIsActive = e => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  
  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <h1 className="app-title">Glimpse of wonders</h1>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2 className="navbar-title">MINNEK</h2>
          <img className="navbar-icon" src="/pet-house.png" alt="logo" />
        </div>
        {id > 0 ? (
          <>
            <div className="navbar-links">
              <span className="log-btn" onClick={logout}>
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
            <div className="menu-toggle">
              <i onClick={handleIsActive} className="bx bx-menu"></i>
            </div>
          </>
        ) : null}
      </nav>

      {isActive && (
        <div className="menu-background">
          <div className="menu-form" ref={modalRef}>
            <span className="log-btn" onClick={logout}>
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
        </div>
      )}
    </>
  );
};

export default Navbar;
