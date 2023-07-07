import React, { useEffect, useState } from "react";
import "../Home.css";

function THome({
  from,
  setFrom,
  to,
  setTo,
  depart,
  setDepart,
  returnDate,
  setReturnDate,
  numOfPassengers,
  setNumOfPassengers,
  travelType,
  setTravelType,
  trainsProps,
  setFilteredTrains,
}) {
  const [trains, setTrains] = useState([]);
  const [trainOption, setTrainOption] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights`
      );
      const data = await response.json();
      setTrainOption(data);
      setTrains(data);
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
    let data = [...trainsProps];
    let result = data.filter(
      (data) => data.from === from && data.to === to
    );
    setFilteredTrains(result);
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleDepartChange = (event) => {
    setDepart(event.target.value);
  };

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleNumOfPassengersChange = (event) => {
    setNumOfPassengers(event.target.value);
  };

  const handleTravelTypeChange = (event) => {
    setTravelType(event.target.value);
  };

  return (
    <div className='home__container'>
      <div className='home'>
        <p>Book International and Domestic Flights</p>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='from home__input'>
              <p>FROM</p>
              <select
                onChange={handleFromChange}
                defaultValue='2'
              >
                <option value=''>
                  Select City
                </option>
                {trainOption.map((form, index) => (
                  <option key={index} value={form.from}>
                    {form.from}
                  </option>
                ))}
              </select>
            </div>
            <div className='to home__input'>
              <p>TO</p>
              <select
                onChange={handleToChange}
                defaultValue='2'
              >
                <option value='dehli'>
                  Select City
                </option>
                {trainOption.map((to, index) => (
                  <option key={index} value={to.to}>
                    {to.to}
                  </option>
                ))}
              </select>
            </div>
            <div className='travel-type home__input'>
              <p>TRAVEL TYPE</p>
              <select
                onChange={handleTravelTypeChange}
                defaultValue='one-way'
              >
                <option value='one-way'>One-Way</option>
                <option value='two-way'>Two-Way</option>
              </select>
            </div>
            <div className='departure home__input'>
              <p>DEPARTURE DATE</p>
              <input
                type="date"
                value={depart}
                onChange={handleDepartChange}
              />
            </div>
            {travelType === 'two-way' && (
              <div className='return home__input'>
                <p>RETURN DATE</p>
                <input
                  type="date"
                  value={returnDate}
                  onChange={handleReturnDateChange}
                />
              </div>
            )}
            <div className='num-of-passengers home__input'>
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
            <button className='home__search' type="submit">SEARCH</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default THome;
