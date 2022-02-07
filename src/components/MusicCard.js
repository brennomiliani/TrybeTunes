import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    checked: false,
    favorites: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ favorites: response, loading: false });
  };

  favoritingSong = async () => {
    const { musicObj } = this.props;
    this.setState({ loading: true });
    const response = await addSong(musicObj);
    this.setState({ checked: true, loading: false });
    return (response);
  };

  render() {
    const { musicObj } = this.props;
    const { trackId, trackName, previewUrl } = musicObj;
    const { loading, checked, favorites } = this.state;
    const card = (
      <div className="player-card">
        <p>{trackName}</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento audio.
        </audio>
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          name="favorite"
          checked={ checked }
          onChange={ this.favoritingSong }
        />
      </div>
    );

    return (
      <>
        {loading ? <Loading /> : card}
        {favorites && null}
      </>
    );
  }
}

MusicCard.propTypes = {
  musicObj: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};
