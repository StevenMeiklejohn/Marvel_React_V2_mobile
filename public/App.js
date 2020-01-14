import React, { Component } from 'react';
import './App.css';
import Main from './containers/mainContainer'

class App extends Component {
  render() {
    return (
      <Main basename={process.env.PUBLIC_URL}/>
    );
  }
}

export default App;
