import { useState, useContext } from 'react';

import {fetchData} from '../../main';
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../contexts/userContext';




function Signup() {
  
  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: '',
  });

  const {userdata, updateUser} = useContext(UserContext);
  let navigate = useNavigate();
  const { username, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSignUp = () => {
    if (password != password2) {
      alert('password and confirm password does not match');
      return;
    }
    fetchData('/users/register', { username, password }, 'POST')
      .then((data) => {
        console.log(data);
        updateUser('username', username)
        navigate(`/profile?user=${username}`);
      })
      .catch((error) => {
        alert(error.error)
        console.error(error);
      });
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <form>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              className="form-control"
              onChange={onChange}
            />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="form-control"
              onChange={onChange}
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              className="form-control"
              onChange={onChange}
            />
            <label className="form-label" htmlFor="password2">
              Confirm Password
            </label>
          </div>

          <button
            type="button"
            onClick={onSignUp}
            className="btn btn-primary btn-block mb-4"
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
