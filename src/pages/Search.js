import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles/search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    searchInput: '',
    btnDisabled: true,
    loading: false,
    albums: [],
    searched: false,
    prevSearch: '',
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
    this.setState({
      prevSearch: searchInput,
      searchInput: '',
      loading: false,
      albums: result,
      searched: true });
  }

  // renderAlbums = () => {
  //   const
  // };

  render() {
    const {
      searchInput,
      btnDisabled,
      albums,
      loading,
      searched,
      prevSearch } = this.state;
    const notFound = <h2>Nenhum álbum foi encontrado</h2>;
    const found = <h2>{`Resultado de álbuns de: ${prevSearch}`}</h2>;
    const albumList = (
      <>
        { (albums.length < 1 && searched) && notFound }
        { albums.length > 0 && found }
        {/* { albums.length > 0 && this.renderAlbums() } */}
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
          <div className="album-list">
            {loading ? <Loading /> : albumList}
          </div>
        </div>
      </>
    );
  }
}
