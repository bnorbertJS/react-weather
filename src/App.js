import React, { Component } from 'react';
import './App.css';
import CityCard from './components/cityCard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {
    cities: [
      { name: 'Budapest' },
      { name: 'New York' },
      { name: 'Veszprém' },
      { name: 'Berlin' },
      { name: 'London' }
    ],
    temperatures: []
  }

  componentDidMount() {
    //getting the cities array from the state
    const { cities } = this.state

    //fetching cities in similar order as presented in state.cities
    Promise.all(
      cities.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&lang=hu&APPID=223f47396554c887b340484e1e0ab958`)
          .then(res => res.json())
      )
    )
      .then(temps => {
        //right now, temps is an array of 5 objects. (5 city), so lets populate state.temperatures with that.
        this.setState({
          temperatures: temps
        })
        console.log(this.state.temperatures);
      })
      .then(icons => {
        this.setState({
          icons: icons
        })
        console.log(this.state.icons);
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
      <Router>
        <div>
          <h1>Weather app in React</h1>
          <Route path="/" exact render={
            () => {
              return <div>
                <div className="list">
                  { //ternary operation. condition ? true : false. If temperatures array is empty that means we are still fetching data
                    //so lets show a loading div. If its not empty we loop throught the array and render CityCards
                    this.state.temperatures.length < 1 ?
                      <div> Loading ...</div> :
                      this.state.cities.map((city, index) => {
                        return (
                          <div>
                            <Link to="forecast" className="link">
                              <CityCard name={city.name} temp={this.state.temperatures[index].main.temp} url={this.state.temperatures[index].weather[0].icon} desc={this.state.temperatures[index].weather[0].description} key={index}></CityCard>
                            </Link>
                          </div>
                        )
                      })
                  }
                </div>
              </div>
            }
          } />
          <Route path="/forecast" exact render={
            () => {
              return <div>
                Forecast page
            </div>
            }
          } />
        </div>
      </Router>
    );
  }
}

export default App;
