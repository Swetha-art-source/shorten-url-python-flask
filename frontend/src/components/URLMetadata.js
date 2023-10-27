import React, { Component } from 'react';
import axios from 'axios';
import './URLMetadata.css'

class URLMetadata extends Component {
  state = {
    shortUrl: "",
    urlData: null,
  };

  // Retrieve URL metadata based on the short URL
  getUrlMetadata = () => {
    axios.get(`http://localhost:5000/${this.state.shortUrl}`) // Replace with your Flask server URL
      .then((response) => {
        this.setState({ urlData: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className='container'>
        <input
          type="text"
          className='inputfield'
          placeholder="Enter a short URL"
          value={this.state.shortUrl}
          onChange={(e) => this.setState({ shortUrl: e.target.value })}
        />

        <button className='button' onClick={this.getUrlMetadata}>Get URL Metadata</button>

        {this.state.urlData && (
          <div>
            <h2 className='result-heading'>URL Metadata:</h2>
            <p className='result'>Short URL: {this.state.shortUrl}</p>
            <p className='result'>Hits: {this.state.urlData.hits}</p>
            <p className='result'>URL: {this.state.urlData.url}</p>
          </div>
        )}
      </div>
    );
  }
}

export default URLMetadata;
