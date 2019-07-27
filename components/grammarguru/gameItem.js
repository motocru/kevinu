import React, { Component } from 'react';

class GameItem extends Component {
  render() {
    return(
      <React.Fragment>
        <td>{this.props.game.level}</td>
        <td>{this.props.game.view}</td>
        <td>{this.props.game.remaining}</td>
        <td>{this.props.game.word}</td>
        <td>{this.props.game.status}</td>
      </React.Fragment>
    );
  }
}
export default GameItem;