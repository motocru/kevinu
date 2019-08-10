//functional library imports
import React, { Component } from 'react';
import Layout from '../../components/layout';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill(); //do I even need this?

//Component Imports
import Games from '../../components/grammarguru/games';
import GameModal from '../../components/grammarguru/gameModal';

class grammarguru extends Component {

  state = {
    player: '',
    textcolor: '#f00a0a',
    bodycolor: '#114fe4',
    guesscolor: '#0ac90e',
    font: 'Lobster',
    level: 'Medium',
    games: [],
    fonts: [],
    levels: [],
    modal: false,
    game: {
      colors: {}
    }
  }

  componentDidMount() {
    /**sets/gets the player id based upon the session variable
     * then populates the table with all games associated with the user
     */
    fetch('https://localhost:3000/api/authentication/user', {
      method: 'post'
    })
    .catch(err => {this.setState({player: ''}); console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({player: data.user});
      this.populateUserGames(this.state.player);
    });

    /**Sets all the metadata values */
    fetch('https://localhost:3000/api/wordgame/meta', {
      method: 'get'
    })
    .catch(err => {console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({textcolor: data.defaults.colors.text, bodycolor: data.defaults.colors.body, 
        guesscolor: data.defaults.colors.guess, fonts: data.fonts, levels: data.levels, font: data.defaults.font.family,
        level: data.defaults.level.name});
      /**populates the head with the included custom fonts */
      if (document.head.getElementsByClassName("gFont")[0] !== undefined) return;
      else {
        data.fonts.forEach(element => {
          var link = document.createElement("LINK");
          link.href = element.url;
          link.rel = "stylesheet";
          link.className = "gFont";
          document.head.appendChild(link);
        });
      }
    });
  }

  populateUserGames = (user) => {
    fetch(`https://localhost:3000/api/wordgame/${user}`, {
      method: 'get'
    })
    .catch(err => {this.setState({games: []}); console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({games: data});
    });
  }

  newGame = () => {
    var colors = {textcolor: this.state.textcolor, 
      bodycolor: this.state.bodycolor, guesscolor: this.state.guesscolor};
    var body = { font: this.state.font, colors: colors};
    fetch(`https://localhost:3000/api/wordgame/${this.state.player}?level=${this.state.level}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })
    .catch(err => {console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({game: data});
      this.populateUserGames(this.state.player);
    });
    this.toggle();
  }

  showModal = (game) => {
    this.setState({game: game});
    this.toggle();
  }

  guessLetter = (letter) => {
    fetch(`https://localhost:3000/api/wordgame/${this.state.player}/${this.state.game._id}/guess?letter=${letter}`, {
        method: 'put'
    })
    .catch(err => {console.error(err);})
    .then(res => res.json())
    .then(data => {console.log(data); this.setState({game: data})});
  }

  toggle = () => {
    this.populateUserGames(this.state.player);
    this.setState({modal: !this.state.modal});
  }

  onChange = (e) => {this.setState({[e.target.name]: e.target.value})};

  render () {
    return(
      <Layout>
        <div>
          {/**This row covers the overhead game bar */}
          <div className="row">
            <div className="card card-body bg-light form-inline">
              <div className="font col-sm-3">
                <strong style={{color: "#fff"}}>Font: </strong>
                <select className="custom-select custome-select-sm pointers" name="font" value={this.state.font} onChange={this.onChange}>
                  {/**populates the font option selector */}
                  {this.state.fonts.map((font, key) => (
                    <option key={key} value={font.family}>{font.family}</option>
                  ))}
                </select>
              </div>
              {/**Div for all the color selection */}
              <div className="colors col-sm-5 form-inline">
                {/**First input group selects our text color used */}
                <div className="input-group input-group mb-3 color">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><strong>Text: </strong></span>
                  </div>
                  <input 
                    type="color" 
                    className="form-control colorwidth pointers" 
                    name="textcolor" 
                    value={this.state.textcolor} 
                    onChange={this.onChange} 
                  />
                </div>
                {/**Second input group selects our body color used */}
                <div className="input-group input-group mb-3 color">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><strong>Body: </strong></span>
                  </div>
                  <input 
                    type="color" 
                    className="form-control colorwidth pointers" 
                    name="bodycolor" 
                    value={this.state.bodycolor} 
                    onChange={this.onChange} 
                  />
                </div>
                {/**Thirs input group selects our guess color used */}
                <div className="input-group input-group mb-3 color">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><strong>Guess: </strong></span>
                  </div>
                  <input 
                    type="color" 
                    className="form-control colorwidth pointers" 
                    name="guesscolor" 
                    value={this.state.guesscolor} 
                    onChange={this.onChange} 
                  />
                </div>
              </div>
              {/**This selects our level of difficulty */}
              <div className="difficulty col-sm-2">
                <strong style={{color: "#fff"}}>Level: </strong>
                <select className="custom-select custome-select-sm pointers" name="level" value={this.state.level} onChange={this.onChange}>
                  {/**populates the level option selector */}
                  {this.state.levels.map((level, key) => (
                    <option key={key} value={level.name}>{level.name}</option>
                  ))}
                </select>
              </div>
              {/**This div is for the New Game Button */}
              <div className="new-game col-sm-2">
                {/**game Modal is the pop-up window for our game when making guesses and viewing at a closer level */}
                <GameModal 
                  modal={this.state.modal}
                  toggle={this.toggle}
                  showModal={this.showModal}
                  onChange={this.onChange}
                  game={this.state.game}
                  guessLetter={this.guessLetter}
                  player={this.state.player}
                />
                <button className="btn btn-primary float-right" onClick={this.newGame}><strong>New Game</strong></button>
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
            <tbody>
              {/**Games loops over the games in the current state array and then 
              populates the table */}
              <Games games={this.state.games} 
              showModal={this.showModal}
              />
            </tbody>
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
            margin-top: 17px;
          }

          .colorwidth {
            width: 60px;
          }

          .pointers {
            cursor: pointer;
          }
        `}</style>
      </Layout>
    );
  }
}
export default grammarguru;
