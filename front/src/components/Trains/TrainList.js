import React, { useEffect, useState } from 'react';
import "./TrainList.css";
import TCard from './TCard';
import "../Home.css";
import THome from './THome';


function TrainList() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [numOfPassengers, setNumOfPassengers] = useState(1);
  const [travelType, setTravelType] = useState("one-way");

  const [trains, setTrains] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);

  const getData = async () => {
    await fetch(
      "https://content.newtonschool.co/v1/pr/63b85e152cabb8fdea2673ee/trains"
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredTrains(data);
        setTrains(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
    <THome
      from={from}
      setFrom={setFrom}
      to={to}
      setTo={setTo}
      depart={depart}
      setDepart={setDepart}
      returnDate={returnDate}
      setReturnDate={setReturnDate}
      numOfPassengers={numOfPassengers}
      setNumOfPassengers={setNumOfPassengers}
      travelType={travelType}
      setTravelType={setTravelType}
      trainsProps={trains}
      setFilteredTrains={setFilteredTrains}
    />
    <div className='flight__container'>
      <div className='flight'>
        <h3>Available Tickets</h3>
        <div className='flight__cards'>
          <TCard
            from={from}
            to={to}
            depart={depart}
            returnDate={returnDate}
            numOfPassengers={numOfPassengers}
            travelType={travelType}
            trains={trains}
            setTrains={setTrains}
            filteredTrains={filteredTrains}
            setFilteredTrains={setFilteredTrains}
          />
        </div>
      </div>

    </div>
    </>
  )
}

export default TrainList;
