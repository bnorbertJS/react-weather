import React, { Component } from 'react';
import './App.css';
import CityCard from './components/cityCard';

class App extends Component {
  state = {
    cities: [
      { name: 'Budapest'},
      { name: 'New York'},
      { name: 'Veszprém'},
      { name: 'Berlin'},
      { name: 'London'}
    ],
    temperatures: []
  }

  temps = [];

  componentDidMount() {
    //TODO: Refactor by Norbert aki egy kiraJ
    this.state.cities.forEach((city) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&APPID=223f47396554c887b340484e1e0ab958`)
        .then(res => res.json())
        .then(json => {
          this.temps.push(json.main.temp);
          this.setState({
            temperatures: this.temps
          })
        })
        //miért nem müködött a setstate a .then-en kivül?????????????????
    })
  }

  render() {
    return (
      <div>
        <h1>Weather app in React</h1>
        <div className="list">
          {
            this.state.cities.map((city, index) => {
              return (
                <CityCard name={city.name} temp={this.state.temperatures[index]} key={index}></CityCard>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
