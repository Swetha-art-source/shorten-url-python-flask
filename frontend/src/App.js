import React, { Component } from 'react';
import URLShortener from './components/URLShortener';
import URLSearch from './components/URLSearch';
import WelcomeMessage from './components/WelcomeMessage';
import URLMetadata from './components/URLMetadata';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <WelcomeMessage />
        <URLShortener />
        <URLSearch />
        <URLMetadata />
      </div>
    );
  }
}

export default App;