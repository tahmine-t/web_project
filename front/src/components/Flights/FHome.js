import React, { useState, useEffect } from "react";
import "../Home.css";

function FHome({
  from,
  setfrom,
  to,
  setTo,
  flightsProps,
  setFilteredFlights,
}) {
  const [flights, setFlights] = useState([]);
  const [flightOption, setFlightOption] = useState([]);
  const [tripType, setTripType] = useState("one-way");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numOfPassengers, setNumOfPassengers] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights`
      );
      const data = await response.json();
      setFlightOption(data);
      setFlights(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = [...flightsProps];
    let result = data.filter(
      (data) => data.from === from && data.to === to
    );
    setFilteredFlights(result);
  };

  const handleFromChange = (event) => {
    setfrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };

  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleNumOfPassengersChange = (event) => {
    setNumOfPassengers(event.target.value);
  };

  return (
    <div className="home__container">
      <div className="home">
        <p>Book International and Domestic Flights</p>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="from home__input">
              <p>FROM</p>
              <select onChange={handleFromChange} defaultValue="1">
                <option value="dehli">Select City</option>
                {flightOption.map((form, index) => (
                  <option key={index} value={form.from}>
                    {form.from}
                  </option>
                ))}
              </select>
            </div>

            <div className="to home__input">
              <p>TO</p>
              <select onChange={handleToChange} defaultValue="1">
                <option value="goa">Select City</option>
                {flightOption.map((to, index) => (
                  <option key={index} value={to.to}>
                    {to.to}
                  </option>
                ))}
              </select>
            </div>

            <div className="trip-type home__input">
              <p>TRIP TYPE</p>
              <select onChange={handleTripTypeChange} defaultValue="one-way">
                <option value="one-way">One-Way</option>
                <option value="two-way">Two-Way</option>
              </select>
            </div>

            <div className="departure-date home__input">
              <p>DEPARTURE DATE</p>
              <input
                type="date"
                value={departureDate}
                onChange={handleDepartureDateChange}
              />
            </div>

            {tripType === "two-way" && (
              <div className="return-date home__input">
                <p>RETURN DATE</p>
                <input
                  type="date"
                  value={returnDate}
                  onChange={handleReturnDateChange}
                />
              </div>
            )}

            <div className="num-passengers home__input">
              <p>NUMBER OF PASSENGERS</p>
              <input
                type="number"
                min="1"
                value={numOfPassengers}
                onChange={handleNumOfPassengersChange}
              />
            </div>
          </div>
          <div>
            <button className="home__search" type="submit">
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FHome;
