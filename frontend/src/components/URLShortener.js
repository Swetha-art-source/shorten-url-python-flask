import React, { Component } from 'react';
import axios from 'axios';
import './URLShortener.css'

class URLShortener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: '',
      shortUrl: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ longUrl: e.target.value });
  }

  shortenURL = () => {
    axios.post('http://localhost:5000/shorten', { url: this.state.longUrl })
      .then((response) => {
        this.setState({ shortUrl: response.data.short_url });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='container'>
        <h2 className='heading'>URL Shortener</h2>
        <input
          type="text"
          className='inputfield'
          placeholder="Enter a URL"
          value={this.state.longUrl}
          onChange={this.handleInputChange}
        />
        <button className='button' onClick={this.shortenURL}>Shorten</button>
        {this.state.shortUrl && (
          <div>
            <p className='result'>Short URL: {this.state.shortUrl}</p>
          </div>
        )}
      </div>
    );
  }
}

export default URLShortener;
