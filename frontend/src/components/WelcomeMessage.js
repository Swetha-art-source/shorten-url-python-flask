import React, { Component } from 'react';
import axios from 'axios';
import './WelcomeMessage.css'

class WelcomeMessage extends Component {
  state = {
    message: "",
  };

  // Fetch the welcome message from the / endpoint
  fetchWelcomeMessage = () => {
    axios.get("http://localhost:5000/") // Replace with your Flask server URL
      .then((response) => {
        this.setState({ message: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    // Fetch the welcome message when the component mounts
    this.fetchWelcomeMessage();
  }

  render() {
    return (
      <h1 className='heading'>{this.state.message}</h1>
    );
  }
}

export default WelcomeMessage;
