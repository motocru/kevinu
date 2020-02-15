//functional library imports
import React, { Component } from 'react';
import Layout from '../../components/layout';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill(); //do I even need this?

//Component Imports
import Games from '../../components/grammarguru/games';
import GameModal from '../../components/grammarguru/gameModal';

const dev = process.env.NODE_ENV !== 'production';
const host = (dev) ? 'http://localhost:3001' : 'https://kevin-u.com';
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
    isShowing: false,
    game: {
      guesses: '',
      colors: {}
    }
  }

  componentDidMount() {
    /**sets/gets the player id based upon the session variable
     * then populates the table with all games associated with the user
     */
    fetch(`${host}/api/authentication/user`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    })
    .catch(err => {this.setState({player: ''}); console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({player: data.user});
      this.populateUserGames(this.state.player);
      this.populateMeta();
    });
  }

  /**populates the table with games associated with the current user */
  populateUserGames = (user) => {
    fetch(`${host}/api/wordgame/${user}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
    })
    .catch(err => {this.setState({games: []}); console.error(err); return;})
    .then(res => res.json())
    .then(data => {
      this.setState({games: data});
    });
  }

  /**populates the meta fields inside of the game */
  populateMeta = () => {
    fetch(`${host}/api/wordgame/meta`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json'
      }
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

  /**Creates a new game based upon the values that are currently set on the game bar */
  newGame = () => {
    var colors = {textcolor: this.state.textcolor, 
      bodycolor: this.state.bodycolor, guesscolor: this.state.guesscolor};
    var body = { font: this.state.font, colors: colors};
    fetch(`${host}/api/wordgame/${this.state.player}?level=${this.state.level}`, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'applciation/json'
      }
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

  /**Sends a letter to the server to check if it's present in the word or not */
  guessLetter = (letter) => {
    fetch(`${host}/api/wordgame/${this.state.player}/${this.state.game._id}/guess?letter=${letter}`, {
        method: 'put',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
    })
    .catch(err => {console.error(err);})
    .then(res => res.json())
    .then(data => {this.setState({game: data})});
  }

  /**Toggles the game modal on or off */
  toggle = () => {
    this.populateUserGames(this.state.player);
    this.setState({isShowing: !this.state.isShowing});
  }

  onChange = (e) => {this.setState({[e.target.name]: e.target.value})};

  render () {
    return(
      <Layout>
        {this.state.isShowing ? <div onClick={this.toggle} className="back-drop"></div> : null }
        <div>
          <div className="gameMenu">
            <div className="form-inline">
              <p><strong>Font: </strong></p>
              <select name="font" value={this.state.font} onChange={this.onChange}>
                {this.state.fonts.map((font, key) => (
                  <option key={key} value={font.family}>{font.family}</option>
                ))}
              </select>
            </div>
            <div className="form-inline">
                <p><strong>Text: </strong></p>
                <input
                  type="color"
                  className="colorwidth pointers"
                  value={this.state.textcolor} 
                  onChange={this.onChange} 
                />
                <p><strong>Body: </strong></p>
                <input
                  type="color" 
                  className="colorwidth pointers" 
                  name="bodycolor" 
                  value={this.state.bodycolor} 
                  onChange={this.onChange} 
                />
                <p><strong>Guess: </strong></p>
                <input
                  type="color" 
                  className="colorwidth pointers" 
                  name="guesscolor" 
                  value={this.state.guesscolor} 
                  onChange={this.onChange}
                />
            </div>
            <div className="form-inline">
              <p><strong>Level: </strong></p>
              <select name="level" value={this.state.level} onChange={this.onChange}>
                  {this.state.levels.map((level, key) => (
                    <option key={key} value={level.name}>{level.name}</option>
                  ))}
              </select>
            </div>
            <div className="form-inline">
              <button className="btn" onClick={this.newGame}><strong>New Game</strong></button>
            </div>
          </div>
        </div>
        <div>
          {/**This row covers the overhead game bar */}
          {/**This div covers the table header and will host the table row */}
          <table className="table">
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
        <GameModal 
            show={this.state.isShowing}
            toggle={this.toggle}
            showModal={this.showModal}
            onChange={this.onChange}
            game={this.state.game}
            guessLetter={this.guessLetter}
            player={this.state.player}
          />
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
            margin-left: 5px;
            margin-right: 5px;
            border-radius: 3px;
            
          }

          .colorwidth:hover {
            background-color: #330000;
          }

          .pointers {
            cursor: pointer;
          }

          select {
            padding: 8px 18px;
            margin-left: 5px;
            border: none;
            border-radius: 4px;
            background-color: #f1f1f1;
            cursor: pointer;
          }

          table {
            border-collapse: collapse;
            width 100%;
          }

          table, th, td {
            text-align: center;
            border-bottom: 1px solid #ddd;
          }

          th, td {
            padding: 10px;
          }

          .btn {
            background-color: var(--greenapple);
            color: white;
            border-radius: 5px;
            padding: 14px 20px;
            margin: 8px 0;
            cursor: pointer;
            border: none;
          }

          .btn:hover {
            background-color: #45a049;
          }

          .gameMenu {
            display: grid;
            grid-template-columns: auto auto auto auto;
            align-content: space-evenly;
            border: 1px solid;
            border-color: #808080;
            background-color: #e2e2e2;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 10px;
            margin-top: 15px;
            margin-bottom: 15px;
          }

          .back-drop {
            background-color: rgba(48, 49, 48, 0.42);
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            transition: all 1.3s;
            width: 100%;
         }
        `}</style>
      </Layout>
    );
  }
}

export default grammarguru;
