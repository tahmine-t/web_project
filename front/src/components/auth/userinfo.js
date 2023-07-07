import React, { useState, useEffect } from 'react';
import "./userinfo.css";

const UserInfo = () => {
  const initialData = {
    email: '',
    mobileNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
  };

  const [userData, setUserData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from API or local storage and set it in the state
    const fetchData = async () => {
      try {
        const response = await fetch('api/user'); // Replace 'api/user' with the appropriate API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send updated user data to API or update in local storage
      await fetch('api/user', {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="userinfo">
      <div className="userinfo__conatainer">
        <div className="userinfo__img">
          <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="" />
        </div>
        <h3>User Information</h3>
        {isEditing ? (
          <>
            <label>Email:</label>
            <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
            <label>Mobile Number:</label>
            <input type="text" name="mobileNumber" value={userData.mobileNumber} onChange={handleInputChange} />
            <label>First Name:</label>
            <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
            <label>Last Name:</label>
            <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
            <label>Address:</label>
            <input type="text" name="address" value={userData.address} onChange={handleInputChange} />
            <label>Date of Birth:</label>
            <input type="text" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} />
            <button className="btn" onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <p>Email: {userData.email}</p>
            <p>Mobile Number: {userData.mobileNumber}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Address: {userData.address}</p>
            <p>Date of Birth: {userData.dateOfBirth}</p>
            <button className="btn" onClick={handleEditClick}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
