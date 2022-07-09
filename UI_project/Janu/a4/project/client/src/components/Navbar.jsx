import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from '../contexts/userContext';
function Navbar() {
  const { user, updateUser } = useContext(UserContext);

  let userBtns = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/signin">
          Signin
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Signup
        </Link>
      </li>
    </>
  );
  let profileBtn = (<li className="nav-item">
  <Link className="nav-link" to="/profile">
    Profile
  </Link>
  </li>)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Express App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             {user && user.username && profileBtn}
             {(!user || !user.username)  && userBtns}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
