import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musicObj } = this.props;
    const { trackName, previewUrl } = musicObj;
    return (
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
        <input type="checkbox" name="favorite" />
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicObj: PropTypes.shape({
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};
