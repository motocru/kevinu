import React, { Component } from 'react';
import Results from './results';

class Game extends Component {
   
   state = {
      guess: ''
   }

   onSubmit = (e) => {
      e.preventDefault();
      if ((this.state.guess < 0 || this.state.guess > 59) || this.state.guess === parseInt(this.state.guess, 10)) {
         alert('valid guesses are numbers from 0-59');
      } else {
         this.props.guessTime(this.state.guess);
      }
      this.setState({guess: ""});
   }

   /**function used for recording changes on an element */
   onChange = (e) => {this.setState({[e.target.name]: e.target.value});}

   render () {
      const modStartTime = (this.props.startTime < 10) ? '0'+this.props.startTime : this.props.startTime;
      let guessDOM;
      if (this.props.results.length < this.props.rounds) {
         guessDOM = (<div>
            <h2>Round {this.props.results.length+1} of {this.props.rounds}</h2>
            <h3>{(this.props.item == 'red') ? "Red Armor": "Mega Health"} was picked up at: XX:{modStartTime}</h3>
            <form onSubmit={this.onSubmit}>
               <label htmlFor="guess">Next spawn time: </label>
               <input type="text" name="guess" maxLength="2"
               value={this.state.guess} onChange={this.onChange} />{' '}
               <input type="submit" value="Guess" />
            </form><hr />
            <style jsx>{`
               input[type=text] {
                  border-radius: 4px;
                  padding: 7px 8px;
                  margin: 8px 0;
                  border: 1px solid #ccc;
                  box-sizing: border-box;
                  width: 10%;
               }

               input[type=submit] {
                  background-color: #4CAF50;
                  border: none;
                  color: white;
                  padding: 10px 18px;
                  text-decoration: none;
                  margin: 4px 2px;
                  cursor: pointer;
                  border-radius: 5px;
                  font-weight: bold;
               }
            `}</style>
            </div>
         );
      } else {guessDOM = (<div></div>);}
      return (
         <div
            style={{display: (this.props.active) ? 'block': 'none'}}
         >
            {guessDOM}
            <div>
               <h2>Results:</h2><br />
               <table className="table">
                  <thead>
                     <tr style={{textAlign: 'center'}}>
                        <th>Item</th>
                        <th>Pickup Time</th>
                        <th>Spawn Time</th>
                        <th>Guess Time</th>
                     </tr>
                  </thead>
                  <tbody>
                     <Results results={this.props.results}/>
                  </tbody>
               </table>
            </div>
            <style jsx>{`
               input[type=text] {
                  border-radius: 4px;
                  padding: 7px 8px;
                  margin: 8px 0;
                  border: 1px solid #ccc;
                  box-sizing: border-box;
                  width: 10%;
               }

               input[type=submit] {
                  background-color: #4CAF50;
                  border: none;
                  color: white;
                  padding: 10px 18px;
                  text-decoration: none;
                  margin: 4px 2px;
                  cursor: pointer;
                  border-radius: 5px;
                  font-weight: bold;
               }

               table {
                  border-collapse: collapse;
                  width 100%;
               }
            `}</style>
         </div>
      );
   }
}

export default Game;