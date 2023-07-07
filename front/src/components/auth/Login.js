import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { DataAppContext } from '../DataApp';

const Login = () => {
  const navigate = useNavigate();
  const localContext = useContext(DataAppContext);
  const { appState, setAppState } = localContext;
  const { loginStatus } = appState;

  const initialData = {
    username: '',
    password: '',
  }

  const [loginformdata, setFormdata] = useState(initialData);
  const [loginstatus, setStatus] = useState(false);

  const updateData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value.trim();
    setFormdata({ ...loginformdata, ...tempObj });
  }

  const loginFn = () => {
    let temp = JSON.parse(localStorage.getItem('users'));
    let user = temp.find(user => user.username === loginformdata.username);
    if (user && user.password === loginformdata.password) {
      setStatus(true);
      setAppState({
        ...appState,
        loginStatus: true,
        username: loginformdata.username,
      });
      navigate('/');
    } else {
      alert("Invalid username or password");
    }
    setFormdata(initialData);
  }

  useEffect(() => {
    let temp = localStorage.getItem('users');
    console.log(JSON.parse(temp));
  }, [loginstatus]);

  return (
    <div className='login'>
      <div className='login__conatainer'>
        <div className='login__img'>
          <img src='https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png' alt=''/>
        </div>
        <h3>Login Form</h3>
        <input type="text" id="username" onChange={updateData} value={loginformdata.username} placeholder="Enter UserName" autoComplete="off" />
        <input type="password" id="password" onChange={updateData} value={loginformdata.password} placeholder="Enter Password" />
        <br></br>
        <button className='btn' onClick={loginFn}>Login</button>
        <br></br>
        <Link to="/register">Register</Link>
        {loginstatus && <div className="alert alert-success" role="alert">
          <p>Logged In Successfully</p>
        </div>}
      </div>
    </div>
  );
}

export default Login;
