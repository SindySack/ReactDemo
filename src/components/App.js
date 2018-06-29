import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import CityList from './CityList';
import CityForecast from './CityForecast';
import { Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            <Link to="/">
              Demo zu React: Wetterapp
            </Link>
          </h1>
        </header>
        <Container>
          <Route exact path="/forecast/:name" component={CityForecast} />
          <Route exact path="/" component={CityList} />
        </Container>         
      </div>
    );
  }
}

export default App;
