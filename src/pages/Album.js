import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import './styles/album.css';

export default class Album extends Component {
  state = {
    musicArray: [],
    loading: false,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const music = await getMusics(id);
    this.setState({ loading: false, musicArray: music });
  }

  renderCard = () => {
    const { musicArray } = this.state;
    return (
      <div className="album-card big-margin">
        <img src={ musicArray[0].artworkUrl100 } alt={ musicArray[0].collectionName } />
        <div className="card-text">
          <p
            data-testid="album-name"
            className="album-title"
          >
            { musicArray[0].collectionName }
          </p>
          <p data-testid="artist-name">{ musicArray[0].artistName }</p>
        </div>
      </div>
    );
  };

  renderPlayers = () => {
    const { musicArray } = this.state;
    const newArray = musicArray.filter((music) => music.kind === 'song').map((song) => (
      <>
        <p>{song.trackName}</p>
        <audio
          key={ song.trackId }
          data-testid="audio-component"
          src={ song.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento audio.
        </audio>
      </>
    ));
    return newArray;
  }

  render() {
    const { musicArray, loading } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album" className="musics-containter">
          {loading && <Loading />}

          {musicArray.length > 0 && this.renderCard()}
          {musicArray.length > 0 && this.renderPlayers()}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
