import React, { Component } from 'react';
import Header from '../components/Header';
import './styles/search.css';

export default class Search extends Component {
  state = {
    searchInput: '',
    btnDisabled: true,
  };

  verifyBtn = () => {
    const { searchInput } = this.state;
    if (searchInput.length > 1) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyBtn);
  }

  render() {
    const { btnDisabled } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              name="searchInput"
              onChange={ this.handleChange }
            />
            <button
              disabled={ btnDisabled }
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
