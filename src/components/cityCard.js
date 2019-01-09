import React from 'react';
import sunny from './sunny.png';
import './dayCard.css';

const cityCard = (props) => {
  const url = `http://openweathermap.org/img/w/${props.url}.png`;
  return (
    <div className="card">
      <h3>
        {props.name}
        <br />
        {props.temp}°
    </h3>
      <img src={url} alt="sun" />
      <h4>
        {props.desc}
      </h4>
    </div>
  )
}
export default cityCard;