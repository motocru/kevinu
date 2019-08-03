import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameItem extends Component {
  render() {
    return(
      <React.Fragment>
        <td>{this.props.game.level}</td>
        <td className="letters">{this.props.game.view}</td>
        <td>{this.props.game.remaining}</td>
        <td>{this.props.game.word}</td>
        <td>{this.props.game.status}</td>
        <style jsx>{`
          .letters {
            letter-spacing: 10px;
            color: ${this.props.game.colors.textcolor};
            background-color: ${this.props.game.colors.bodycolor};
            font-family: ${this.props.game.font};
            font-size: 20px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

GameItem.propTypes = {
  game: PropTypes.object.isRequired
}

export default GameItem;