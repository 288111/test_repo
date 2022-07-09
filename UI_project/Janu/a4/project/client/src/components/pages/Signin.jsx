import { useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import {fetchData} from '../../main';
import { UserContext } from '../../contexts/userContext';

function Signin() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const {userdata, updateUser} = useContext(UserContext);
  let navigate = useNavigate();
  const { username, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSignIn = () => {
    fetchData('/users/login', { username, password }, 'POST')
      .then((data) => {
        console.log(data);
        updateUser('username', username);
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
            <input type="text" id="username" name="username" value={username} className="form-control" onChange={onChange} />
            <label className="form-label" htmlFor="username">
              Username
            </label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" id="password" name="password" value={password} className="form-control" onChange={onChange} />
            <label className="form-label" htmlFor="password">
              Password
            </label>
          </div>

          <button type="button" onClick={onSignIn} className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;
