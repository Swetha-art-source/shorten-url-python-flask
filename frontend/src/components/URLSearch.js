import React, { Component } from 'react';
import axios from 'axios';
import './URLSearch.css'

class URLSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      results: {},
    };
  }

  handleInputChange = (e) => {
    this.setState({ term: e.target.value });
  }

  searchURLs = () => {
    axios.get(`http://localhost:5000/search?term=${this.state.term}`)
      .then((response) => {
        this.setState({ results: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className='container'>
        <h2 className='heading'>Search URLs</h2>
        <input
          type="text"
          className='inputfield'
          placeholder="Enter a search term"
          value={this.state.term}
          onChange={this.handleInputChange}
        />
        <button className='button' onClick={this.searchURLs}>Search</button>
        {Object.keys(this.state.results).length > 0 && (
          <div>
            <h3 className='result-heading'>Results:</h3>
            <ul>
              {Object.keys(this.state.results).map((key) => (
                <li key={key}>
                  <p className='result'>Short URL: {key}</p>
                  <p className='result'>Hits: {this.state.results[key].hits}</p>
                  <p className='result'>URL: {this.state.results[key].url}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default URLSearch;
