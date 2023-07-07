import React, { useEffect, useState } from 'react';
import "./FlightList.css";
import FCard from './FCard';
import FHome from "./FHome";

function FlightList() {
  const [from, setfrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const [flights, setFlights] = useState([]);
  const [filteredflights, setFilteredFlights] = useState([]);

  const getData = async () => {
    await fetch(
      "https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights"
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredFlights(data);
        setFlights(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FHome
        from={from}
        setfrom={setfrom}
        to={to}
        setTo={setTo}
        flightsProps={flights}
        setFilteredFlights={setFilteredFlights}
        depart={depart}
        setDepart={setDepart}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
        numOfPassengers={numOfPassengers}
        setNumOfPassengers={setNumOfPassengers}
      />
      <div className='flight__container'>
        <div className='flight'>
          <h3>Available Tickets</h3>
          <div className='flight__cards'>
            <FCard
              from={from}
              to={to}
              depart={depart}
              returnDate={returnDate}
              numOfPassengers={numOfPassengers}
              flights={flights}
              setFlights={setFlights}
              filteredflights={filteredflights}
              setFilteredFlights={setFilteredFlights}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightList;
