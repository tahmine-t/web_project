import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Register.css";

const Register = () => {
  const initialData = {
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [formdata, setFormdata] = useState(initialData);
  const [status, setStatus] = useState(false);

  const updateData = (e) => {
    let tempObj = {};
    tempObj[e.target.id] = e.target.value.trim();
    setFormdata({ ...formdata, ...tempObj });
  }

  const registerFn = () => {
    if (!formdata.mobileNumber || !formdata.email || !formdata.password || !formdata.confirmPassword) {
      alert("Please fill in all the fields");
      return;
    }

    if (formdata.password !== formdata.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    let temp = JSON.parse(localStorage.getItem('users')) || [];
    if (temp.some(user => user.username === formdata.mobileNumber)) {
      alert("Username already exists");
      return;
    }

    setStatus(true);
    localStorage.setItem('users', JSON.stringify([...temp, { username: formdata.mobileNumber, password: formdata.password }]));
    setFormdata(initialData);
  }

  useEffect(() => {
    let temp = localStorage.getItem('users');
    console.log(JSON.parse(temp));
  }, [status]);

  const getPasswordStrength = () => {
    const password = formdata.password;
    let strength = 0;

    if (password.length >= 8) {
      strength++;
    }

    if (/[A-Z]/.test(password)) {
      strength++;
    }

    if (/[a-z]/.test(password)) {
      strength++;
    }

    if (/\d/.test(password)) {
      strength++;
    }

    return strength;
  }

  const passwordStrengthText = {
    0: 'Weak',
    1: 'Medium',
    2: 'Strong',
    3: 'Very Strong',
  }

  const passwordStrength = getPasswordStrength();

  return (
    <div className='register'>
      <div className='register__conatainer'>
        <div className='register__img'>
          <img src='https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png' alt=''/>
        </div>
        <h3>Register Form</h3>
        <input type="text" id="mobileNumber" onChange={updateData} value={formdata.mobileNumber} placeholder="Enter Mobile Number" />
        <input type="email" id="email" onChange={updateData} value={formdata.email} placeholder="Enter Email" />
        <input type="password" id="password" onChange={updateData} value={formdata.password} placeholder="Enter Password" />
        <input type="password" id="confirmPassword" onChange={updateData} value={formdata.confirmPassword} placeholder="Confirm Password" /><br></br>
        <p>Password Strength: {passwordStrengthText[passwordStrength]}</p>
        <button className='btn' onClick={registerFn}>Register</button>
        <br></br>
        <br></br>
        <Link to="/login">Login</Link>
        {status && <div className="alert alert-success" role="alert">
          <p>Registered Successfully</p>
        </div>}
      </div>
    </div>
  );
}

export default Register;
