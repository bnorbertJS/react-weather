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

  componentDidMount() {
    //getting the cities array from the state
    const { cities } = this.state

    //fetching cities in similar order as presented in state.cities
    Promise.all(
      cities.map( city => 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&APPID=223f47396554c887b340484e1e0ab958`)
          .then(res => res.json())
      )
    )
    .then(temps => {
      //right now, temps is an array of 5 objects. (5 city), so lets populate state.temperatures with that.
      this.setState({
        temperatures: temps
      })
    })

    /*this.state.cities.forEach((city) => {
      
        .then(res => res.json())
        .then(json => {
          this.temps.push(json.main.temp);
          this.setState({
            temperatures: this.temps
          })
        })
        //miért nem müködött a setstate a .then-en kivül?????????????????
    }) */
  }

  render() {
    return (
      <div>
        <h1>Weather app in React</h1>
        <div className="list">
          { //ternary operation. condition ? true : false. If temperatures array is empty that means we are still fetching data
            //so lets show a loading div. If its not empty we loop throught the array and render CityCards
            this.state.temperatures.length < 1 ? 
              <div> Loading ...</div> :
              this.state.cities.map((city, index) => {
                return (
                  <CityCard name={city.name} temp={this.state.temperatures[index].main.temp} key={index}></CityCard>
                )
              })
          }
        </div>
      </div>
    );
  }
}

export default App;
