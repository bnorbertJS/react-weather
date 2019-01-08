import React from 'react';
import sunny from './sunny.png';
import './dayCard.css';

const cityCard = (props) => {
  return (
    <div className="card">
    <h3>
      {props.name}
      <br/>
      {props.temp}°
    </h3>
    <img src={sunny} alt="sun" />
    </div>
  )
}
export default cityCard;