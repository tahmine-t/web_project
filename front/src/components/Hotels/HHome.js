import React, { useEffect, useState } from "react";
import "../Home.css";

function HHome({
  from,
  setfrom,
  numOfPeople,
  setNumOfPeople,
  hotelsProps,
  setFilteredHotels,
}) {
  const [hotels, setHotels] = useState([]);
  const [hotelOption, setHotelOption] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels`
      );
      const data = await response.json();
      setHotelOption(data);
      setHotels(data);
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
    let data = [...hotelsProps];
    let result = data.filter((data) => data.city === from);
    setFilteredHotels(result);
  };

  const handleFromChange = (event) => {
    setfrom(event.target.value);
  };

  const handleNumOfPeopleChange = (event) => {
    setNumOfPeople(event.target.value);
  };

  return (
    <div className='home__container'>
      <div className='home'>
        <p>Book International and Domestic Hotels</p>

        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <div className='from home__input'>
              <p>CITY</p>

              <select defaultValue='1' onChange={handleFromChange}>
                <option value=''>Select City</option>
                {hotelOption.map((city, index) => (
                  <option key={index} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>

            <div className='num-of-people home__input'>
              <p>NUMBER OF PEOPLE</p>
              <input
                type='number'
                min='1'
                value={numOfPeople}
                onChange={handleNumOfPeopleChange}
              />
            </div>

            <div className='check-in home__input'>
              <p>CHECK-IN</p>
              <input type='date' />
            </div>

            <div className='check-out home__input'>
              <p>CHECK-OUT</p>
              <input type='date' />
            </div>
          </div>
          <div>
            <button className='home__search' type='submit'>
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HHome;
