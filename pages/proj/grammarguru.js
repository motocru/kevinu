//functional library imports
import React, { Component } from 'react';
import Layout from '../../components/layout';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill(); //do I even need this?

//Component Imports
import Games from './../../components/grammarguru/games';

class grammarguru extends Component {

  state = {
    player: '',
    games: []
  }
  /*

  componentDidMount() {
    fetch('http://localhost:3000/api/authentication/user', {
      method: 'post'
    })
    .catch(err => {this.setState({player: ''}); console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({player: data.user});
      this.populateUserGames(data.user);
    });
  }

  populateUserGames = (user) => {
    fetch(`http://localhost:3000/api/wordgame/${user}`, {
      method: 'get'
    })
    .catch(err => {this.setState({games: []}); console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({games: data});
      console.log(data);
    });
  }

  newGame = () => {

  }*/

  render () {
    return(
      <Layout>
        <div>
          {/**This row covers the overhead game bar */}
          <div className="row">
            <div className="card card-body bg-light form-inline">
              <div className="font col-sm-1">
                <strong>Font: </strong>
              </div>
              {/**Div for all the color selection */}
              <div className="colors col-sm-5 form-inline">
                <div className="text color ">
                  <strong>Text: </strong>
                </div>
                <div className="body color ">
                  <strong>Body: </strong>
                </div>
                <div className="guess color ">
                  <strong>Guess: </strong>
                </div>
              </div>
              {/**This selects our level of difficulty */}
              <div className="difficulty col-sm-2">
                <strong>Level: </strong>
              </div>
              {/**This div is for the New Game Button */}
              <div className="new-game col-sm-4">
                <button className="btn btn-primary float-right">New Game</button>
              </div>
            </div>
          </div><br />
          {/**This div covers the table header and will host the table row */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Level</th>
                <th>Phrase</th>
                <th>Remaining</th>
                <th>Answer</th>
                <th>Status</th>
              </tr>
            </thead>
            <Games games={this.state.games} />
          </table>
        </div>
        <style jsx>{`
          .form-inline {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            vertical-align: middle;
          }

          .color {
            padding: 5px;
          }
        `}</style>
      </Layout>
    );
  }
}
export default grammarguru;
