import React, { Component } from 'react';
import Header from '../components/Header';
import './styles/search.css';

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search-artist"
            />
            <button
              data-testid="search-artist-button"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}
