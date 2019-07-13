import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameItem from './gameItem';

class Games extends Component {
  render() {
    return this.props.games.map((game) => (
      <tr>
        <GameItem key={game._id}
        game={game}
        />
      </tr>
    ))
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired
}

export default Games;