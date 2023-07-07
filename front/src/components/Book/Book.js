import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Book.css"
function Book() {
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);

  const handleDateChange = (date) => {
    setDob(date);
  };
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [passengers, setPassengers] = useState([
    {
      nationalCode: '',
      phoneNumber: '',
      age: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'Male'
    }
  ]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Transfer to the payment portal
      console.log('Form submitted successfully');
    }
  };

  const validateForm = () => {
    let isValid = true;

    for (let i = 0; i < numOfPeople; i++) {
      const passenger = passengers[i];
      if (
        passenger.nationalCode.trim() === '' ||
        passenger.phoneNumber.trim() === '' ||
        passenger.age.trim() === '' ||
        passenger.firstName.trim() === '' ||
        passenger.lastName.trim() === '' ||
        passenger.dateOfBirth.trim() === ''
      ) {
        isValid = false;
        break;
      }
      if (!validatePhoneNumber(passenger.phoneNumber)) {
        isValid = false;
        break;
      }
      if (!validateNationalCode(passenger.nationalCode)) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      alert('Please fill in all the required fields and ensure phone numbers and national codes are valid.');
    }

    return isValid;
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters from the phone number
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  
    // Check if the cleaned phone number has exactly 11 digits
    if (cleanedPhoneNumber.length !== 11) {
      return false;
    }
  
    // Perform additional validation logic if needed
  
    return true;
  };
  
  const validateNationalCode = (nationalCode) => {
    // Remove any non-digit characters from the national code
    const cleanedNationalCode = nationalCode.replace(/\D/g, '');
  
    // Check if the cleaned national code has exactly 10 digits
    if (cleanedNationalCode.length !== 10) {
      return false;
    }
  
    // Perform additional validation logic if needed
  
    return true;
  };
  
  
  

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    if (numOfPeople < 5) {
      setNumOfPeople(numOfPeople + 1);
      setPassengers([
        ...passengers,
        {
          nationalCode: '',
          phoneNumber: '',
          age: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: 'Male'
        }
      ]);
    }
  };

  return (
      <div className='payment__container'>
        <div className='main'>
          <div className='right-payment-info'>
            <Form id='payment-form' onSubmit={handleFormSubmit}>
              {[...Array(numOfPeople)].map((_, index) => (
                <div key={index} className='passenger-form'>
                  <h3>Passenger {index + 1}</h3>
                  <Form.Group controlId={`nationalCode-${index}`}>
                    <Form.Label>National Code</Form.Label>
                    <Form.Control
                      type='number'
                      value={passengers[index].nationalCode}
                      onChange={(e) => handlePassengerChange(index, 'nationalCode', e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId={`phoneNumber-${index}`}>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type='number'
                      value={passengers[index].phoneNumber}
                      onChange={(e) => handlePassengerChange(index, 'phoneNumber', e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId={`age-${index}`}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type='number'
                      min='1'
                      value={passengers[index].age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId={`firstName-${index}`}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={passengers[index].firstName}
                      onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId={`lastName-${index}`}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={passengers[index].lastName}
                      onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId={`dateOfBirth-${index}`}>
                    <Form.Label>Date of Birth</Form.Label>
                    <DatePicker
                      selected={dob}
                      onChange={handleDateChange}
                      dateFormat='dd/MM/yyyy'
                      placeholderText='Select date of birth'
                    />
                  </Form.Group>
                  <Form.Group controlId={`gender-${index}`}>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as='select'
                      value={passengers[index].gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                    >
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              ))}
              {numOfPeople < 5 && (
                <Button variant='secondary' onClick={handleAddPassenger}>
                  Add Passenger
                </Button>
              )}
              <Button type='submit'>Place Your Order</Button>
            </Form>
          </div>
        </div>
      </div>
    );

}
  export default Book;