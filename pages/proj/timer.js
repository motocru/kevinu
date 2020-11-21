import React, { Component } from 'react';
import Layout from '../../components/layout';
import Game from '../../components/timer/game';
import fetch from 'isomorphic-fetch';

const dev = process.env.NODE_ENV !== 'production';
const host = (dev) ? 'http://localhost:3001' : 'https://kevin-u.com';
class Timer extends Component {
   state = {
      user: '',
      mega: false,
      red: false,
      rounds: 1,
      active: false,
      game: {
         currentRound: 0,
         rounds: 0,
         items: [],
         startTime: '',
         currentItem: '',
         results: []
      }
   }

   /**fetches the current game if there is one and sets the game state to the
    * game object saved on the server side. Otherwise it leaves the active
    * variable as false*/
   componentDidMount() {
      fetch(`${host}/api/authentication/user`, {
         method: 'post',
         credentials: 'include',
         headers: {
            'Accept': 'application/json'
         }
      })
      .catch(err => {console.error(err); return;})
      .then(res => res.json())
      .then(data => {
         this.setState({user: data.user});
         this.getGame(data.user);
      });
   }

   /**Gets the current game from the server based upon the provided user ID value */
   getGame = (user) => {
      fetch(`${host}/api/timer/${user}`, {
         method: 'get',
         credentials: 'include',
         headers: {
            'Accept': 'application/json'
         }
      })
      .catch(err => {console.error(err); return})
      .then(res => res.json())
      .then(data => {
         if (data.length === 0) {return;}
         else {
            this.setState({game: data[0], active: true, rounds: data[0].rounds});
         }
      })
   }

   /**Checks if there is at least one of the items selected and if the number of rounds is between 1-10
    * then sends a request to the backend to create a new game
   */
   onSubmit = (e) => {
      e.preventDefault();
      if (!this.state.mega && !this.state.red) {alert("at least one option must be selected to play"); return;}
      if (this.state.rounds < 1 || this.state.rounds > 10) {alert("The number of rounds must be from 1-10"); return;}
      var body = {red: this.state.red, mega: this.state.mega};
      fetch(`${host}/api/timer/${this.state.user}?rounds=${this.state.rounds}`, {
         method: 'post',
         credentials: 'include',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(body)
      })
      .catch(err => {console.error(err); return;})
      .then(res => res.json())
      .then(data => {
         //console.log(data);
         this.setState({game: data, active: true});
      })
   }

   /**sends the time that the user guessed to the server for verification and updates
    * the game client side with the updated game object
    */
   guessTime = (time) => {
      //console.log(`the time is ${time}`);
      fetch(`${host}/api/timer/${this.state.user}/guess?time=${time}`, {
         method: 'put',
         credentials: 'include',
         headers: {
            'Accept': 'application/json'
         }
      })
      .catch(err => {console.error(err); return;})
      .then(res => res.json())
      .then(data => {
         this.setState({game: data[0]});
      })
   }

   /**an on change function specifically for the checkboxes */
   checkChange = (e) => {this.setState({[e.target.name]: e.target.checked})}

   /**Change function for the number input */
   onChange = (e) => {this.setState({[e.target.name]: e.target.value})}

   render () {
      return (
         <Layout>
            <div style={{marginTop: "20px"}}>
               <h1>Diabotical / Quake Live Timer</h1><hr />
               <h3>Select your items:</h3><br />
               <form onSubmit={this.onSubmit}>
                  <label className="checkLabel" htmlFor="mega">Mega Health<strong style={{fontSize: '15px'}}> (35 seconds)</strong>
                     <input type="checkbox" id="mega" name="mega" checked={this.state.mega} onChange={this.checkChange} />
                     <span className="checkmark"></span>
                  </label>
                  <label className="checkLabel" htmlFor="red">Red Armor<strong style={{fontSize: '15px'}}> (25 seconds)</strong>
                     <input type="checkbox" id="red" name="red" checked={this.state.red} onChange={this.checkChange} />
                     <span className="checkmark"></span>
                  </label>
                  <label htmlFor="rounds" style={{fontSize: '20px'}}><strong>Number of rounds to play (1-10): </strong></label>
                  <select name="rounds" value={this.state.rounds} onChange={this.onChange}>
                     {[...Array(10).keys()].map((round, key) => (
                        <option key={key} value={round+1}>{round+1}</option>
                     ))}
                  </select><br />
                  <input type="submit" value="Start Game" />
               </form>
               <hr />
               <Game 
                  active={this.state.active}
                  item={this.state.game.currentItem}
                  startTime={this.state.game.startTime}
                  guessTime={this.guessTime}
                  results={this.state.game.results}
                  rounds={this.state.game.rounds}
               />
            </div>
            <style jsx>{`
               input[type=submit] {
                  background-color: #1f7a1f;
                  border: none;
                  color: white;
                  padding: 16px 32px;
                  text-decoration: none;
                  margin: 4px 2px;
                  cursor: pointer;
                  border-radius: 5px;
                  font-weight: bold;
               }

               select {
                  padding: 8px 18px;
                  margin-left: 5px;
                  border: none;
                  border-radius: 4px;
                  background-color: #ccc;
                  cursor: pointer;
               }

               .checkLabel {
                  display: block;
                  position: relative;
                  padding-left: 35px;
                  margin-bottom: 12px;
                  cursor: pointer;
                  font-size: 22px;
                  width: 28%;
               }

               .checkLabel input {
                  postition: abosolute;
                  opacity: 0;
                  cursor: pointer;
                  height: 0;
                  width: 0;
               }

               .checkLabel input ~ .checkmark {
                  background-color: #ccc;
               }

               .checkLabel input:checked ~ .checkmark {
                  background-color: #2196F3;
               }

               .checkmark {
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 25px;
                  width: 25px;
                  background-color: #eee;
               }

               .checkmark:after {
                  content: "";
                  position: absolute;
                  display: none;
               }

               .checkLabel input:checked ~ .checkmark:after {
                  display: block;
               }

               .checkLabel .checkmark:after {
                  left: 9px;
                  top: 5px;
                  width: 5px;
                  height: 10px;
                  border: solid white;
                  border-width: 0 3px 3px 0;
                  -webkit-transform: rotate(45deg);
                  -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
               }
            `}</style>
         </Layout>
      );
   }
}

export default Timer;