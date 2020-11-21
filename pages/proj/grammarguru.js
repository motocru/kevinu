//functional library imports
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Layout from '../../components/layout';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill(); //do I even need this?

//Component Imports
import Games from '../../components/grammarguru/games';

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
    guess: '',
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

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.game.guesses.includes(this.state.guess)) {
        alert('You have already guessed this letter');
    } else {
        this.guessLetter(this.state.guess);
    }
    this.setState({guess: ""});
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
    let guessInputField;

    if (this.state.game.remaining > 0 && this.state.game.status === "Unfinished") {
        guessInputField = (<form onSubmit={this.onSubmit}>
            <span style={{color: 'white', marginRight: '3px'}}><strong>Guess:</strong></span>
            <input type="text" 
                className="guess" 
                name="guess" 
                maxLength="1"
                value={this.state.guess}
                onChange={this.onChange}
                style={{
                    borderRadius: '4px',
                    padding: '7px 11px',
                    margin: '8px 0',
                    border: '1px solid #ccc',
                    boxSizing: 'border-box',
                    marginRight: '3px'
                }}
            />
            <button type="submit"
                style={{
                    backgroundColor: '#3333ff',
                    color: 'white',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: 'none',
                    padding: '8px'
                }}
            >Send Guess</button>
        </form>);
    } else {
        guessInputField = (<div><h4>Status: {this.state.game.status}</h4></div>);
    }

    return(
      <Layout>
        <div>
          <div className="card" style={{marginTop: '15px', marginBottom: '10px'}}>
            <div className="card-body">
              <div className="row">
                {/**Begin font selection div */}
                <div className="col-sm-3">
                  <div className="form-group form-inline">
                    <label htmlFor="font"><strong>Font: </strong></label>
                    <select className="form-control" id="font" name="font" value={this.state.font} onChange={this.onChange}>
                      {this.state.fonts.map((font, key) => (
                        <option key={key} value={font.family}>{font.family}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/**begin Color selection div */}
                <div className="col-sm-4">
                  <div className="form-inline" style={{marginTop: '7px'}}>
                    <label htmlFor="textcolor"><strong>Text: </strong></label>
                    <input type="color" name="textcolor" className="pointers" value={this.state.textcolor} onChange={this.onChange}  style={{marginLeft: '3px', marginRight: '10px'}}/>
                    <label htmlFor="bodycolor"><strong>Body: </strong></label>
                    <input type="color" name="bodycolor" className="pointers" value={this.state.bodycolor} onChange={this.onChange} style={{marginLeft: '3px', marginRight: '10px'}}/>
                    <label htmlFor="guesscolor"><strong>Guess:</strong></label>
                    <input type="color" name="guesscolor" className="pointers" value={this.state.guesscolor} onChange={this.onChange} style={{marginLeft: '3px'}}/>
                  </div>
                </div>
                {/**Begin level selection div */}
                <div className="col-sm-3">
                  <div className="form-group form-inline">
                    <label htmlFor="level"><strong>Level:</strong></label>
                    <select className="form-control" name="level" value={this.state.level} onChange={this.onChange}>
                      {this.state.levels.map((level, key) => (
                        <option key={key} value={level.name}>{level.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-2">
                  <button className="btn btn-primary" onClick={this.newGame}>New Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/**This row covers the overhead game bar */}
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
        <Modal isOpen={this.state.isShowing} toggle={this.toggle} className="modal-lg">
          <ModalHeader>
            Guesses Remaining: {this.state.game.remaining}
          </ModalHeader>
          <ModalBody>
            {guessInputField}
            <div className="form-inline" style={{textAlign: 'center'}}>
                <h3 style={{color: 'white', marginRight: '3px'}}>Current view: </h3>{' '}
                <h3 className="letters view">{this.state.game.view}</h3>
            </div>
          </ModalBody>
          <ModalFooter>
            <h3 style={{marginTop: '3px'}}>Guesses: </h3>{' '}
            <div style={{float: 'left', marginTop: '6px'}}>
                {Array.from(this.state.game.guesses).map((guessLettter, key) => (
                    <h3 key={key} style={{display: 'inline'}} className="letters guess">{guessLettter}</h3>
                ))}
            </div>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <style jsx>{`
          .colorwidth {
            width: 60px;
            margin-left: 5px;
            margin-right: 5px;
            border-radius: 3px;
          }

          .pointers {
            cursor: pointer;
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

         .letters {
            letter-spacing: 8px;
            text-transform: uppercase;
            text-indent: 10px;
            font-size: 25px;
            background-color: ${this.state.game.colors.bodycolor};
            font-family: "${this.state.game.font}";
          }
          .view {
              color: ${this.state.game.colors.textcolor};     
          }
          .guess {
              color: ${this.state.game.colors.guesscolor};
          }
        `}</style>
      </Layout>
    );
  }
}

export default grammarguru;
