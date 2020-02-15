import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GameItem from './gameItem';

class Games extends Component {
  render() {
    return this.props.games.map((game, key) => (
        <tr key={key} onClick={() => this.props.showModal(game)}>
          <GameItem key={game._id}
          game={game}
          />
          <style jsx>{`
            tr {
              margin: 10px;
              border-bottom: 1px solid #ddd;
            }

            tr:hover {
              background-color: #D3D3D3;
              cursor: pointer;
            }
          `}</style>
        </tr>  
    ))
  }
}

Games.propTypes = {
  games: PropTypes.array.isRequired
}

export default Games;