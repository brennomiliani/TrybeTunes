import React, { Component } from 'react';
import Header from '../components/Header';
import './styles/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    searchInput: '',
    btnDisabled: true,
    loading: false,
    albuns: null,
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
    const { value } = target;
    this.setState({ searchInput: value }, this.verifyBtn);
  }

  btnClcick = async (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const result = await searchAlbumsAPI(searchInput);
    this.setState({ searchInput: '', loading: false, albuns: result });
  }

  render() {
    const { searchInput, btnDisabled, albuns, loading } = this.state;
    const albumList = (
      <>
        {loading && <Loading /> }
        {console.log(albuns)}
      </>
    );

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form className="search-form">
            <input
              type="text"
              value={ searchInput }
              data-testid="search-artist-input"
              name="searchInput"
              onChange={ this.handleChange }
              placeholder="Nome da banda ou artista"
            />
            <button
              disabled={ btnDisabled }
              onClick={ this.btnClcick }
              data-testid="search-artist-button"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
          {albumList}
        </div>
      </>
    );
  }
}
