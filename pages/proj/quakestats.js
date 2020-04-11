/**imports for functional libraries */
import Layout from '../../components/layout';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill(); //do I even need this?

/**imported visual components */
import GunLoop from '../../components/quake/gunLoop';
import Stats from '../../components/quake/stats';

class quake extends Component {
  state = {
    playerName: '',
    player: {},
    gun: 'Gauntlet'
  }

  /**This onSubmit function searches for the username given in the search bar
   * via a fetch request then returns the results if they are valid,
   * or exits if they are not
   * NOTE: There's still some odd behavior with names that are not valid AND below
   * a certain number of characters. Still investigating how to fix as this is
   * causing issues for some valid names with shorter length
   */
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.playerName.length <= 4) {
      alert('All valid player names are greater than 4 characters in length');
      this.setState({playerName: ''});
      return;
    }
    if (this.state.playerName.length === 5) this.state.playerName += ' ';
    fetch(`https://stats.quake.com/api/v2/Player/Stats?name=${this.state.playerName}`, {
      method: 'get'
    })
    .catch(err => { this.setState({player: {}}); this.setState({playerName: ''}); return;})
    .then(res => res.json())
    .then(json => {
      this.setState({playerName: ''});
      if (json.code === 404 ) { this.setState({player: {}}); alert('player name is invalid'); return;}
      //console.log(json); 
      this.setState({player: json}); 
    });
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  /**Sets the gun value to whatever gun image was most recently clicked */
  setGun = (key) => {
    this.setState({gun: key});
  }

  /**checks the given numerical value of a given rank and then returns the path
   * to the image with that rank. The path is removed via regex to display 
   * the rank name on the other side
   */
  returnRankingSymbol = (num) => {
    var precursor = '/quake/ranks/';
    if (num <= 774) return `${precursor}Bronze-1.png`;
    else if (num >= 775 && num <= 849) return `${precursor}Bronze-2.png`;
    else if (num >= 850 && num <= 924) return `${precursor}Bronze-3.png`;
    else if (num >= 925 && num <= 999) return `${precursor}Bronze-4.png`;
    else if (num >= 1000 && num <= 1074) return `${precursor}Bronze-5.png`;
    else if (num >= 1075 && num <= 1149) return `${precursor}Silver-1.png`;
    else if (num >= 1150 && num <= 1224) return `${precursor}Silver-2.png`;
    else if (num >= 1225 && num <= 1299) return `${precursor}Silver-3.png`;
    else if (num >= 1300 && num <= 1374) return `${precursor}Silver-4.png`;
    else if (num >= 1375 && num <= 1449) return `${precursor}Silver-5.png`;
    else if (num >= 1450 && num <= 1524) return `${precursor}Gold-1.png`;
    else if (num >= 1525 && num <= 1599) return `${precursor}Gold-2.png`;
    else if (num >= 1600 && num <= 1674) return `${precursor}Gold-3.png`;
    else if (num >= 1675 && num <= 1749) return `${precursor}Gold-4.png`;
    else if (num >= 1750 && num <= 1824) return `${precursor}Gold-5.png`;
    else if (num >= 1825 && num <= 1899) return `${precursor}Diamond-1.png`;
    else if (num >= 1900 && num <= 1974) return `${precursor}Diamond-2.png`;
    else if (num >= 1975 && num <= 2049) return `${precursor}Diamond-3.png`;
    else if (num >= 2050 && num <= 2124) return `${precursor}Diamond-4.png`;
    else if (num >= 2125 && num <= 2199) return `${precursor}Diamond-5.png`;
    else if (num >= 2200) return `${precursor}Elite.png`;
  }

  render() {
    const isValidPlayer = this.state.player;
    let basePlayerInfo;

    if (JSON.stringify(isValidPlayer) !== '{}') {
      basePlayerInfo = (<div>
        <h4>Player Level: {this.state.player.playerLevelState.level}</h4>
        <h4>
          Duel Rating: {this.state.player.playerRatings.duel.rating}{' '}
          <img src={this.returnRankingSymbol(this.state.player.playerRatings.duel.rating)} />{' '}
          ({this.returnRankingSymbol(this.state.player.playerRatings.duel.rating).replace(/(\.+|\/+|public|quake|ranks|png)/gi, '')})
        </h4>
        <h4>
          2v2 Rating: {this.state.player.playerRatings.tdm.rating}
          <img src={this.returnRankingSymbol(this.state.player.playerRatings.tdm.rating)} />{' '}
          ({this.returnRankingSymbol(this.state.player.playerRatings.tdm.rating).replace(/(\.+|\/+|public|quake|ranks|png)/gi, '')})
        </h4>
      </div>);
    } else basePlayerInfo = <div></div>

    return (
      <Layout>
        <div style={{marginTop: '20px'}}>
          <h1>Quake Champions Stats page</h1><hr />
          <form style={{display: 'inline'}} onSubmit={this.onSubmit}>
            {/**Redesign without the bootstrap can be found here */}
              <label htmlFor="playerName">Player Name: </label>
              <input type="text" 
                className="textField" 
                name="playerName" 
                value={this.state.playerName}
                onChange={this.onChange}
              /><span style={{marginLeft: '10px'}}></span>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <div className="details"><br />
            <h3>Current Player: {this.state.player.name}</h3><br />
            {basePlayerInfo} {/**Our conditional rendering componenet from above */}
            <hr />
            <div className="weaponGrid">
              <div id="wepDiv">
                <h2>Select Your Weapon</h2>
                {/**gun loop contains a loop that prints out the images for each
                of the available guns for quake champions. */}
                <GunLoop setGun={this.setGun}/>
              </div>
              <div>
                {/**This componenet actually calculates the stats for each weapon
                    based on the given data */}
                <Stats gun={this.state.gun} player={this.state.player}/>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          #wepDiv {
            border-right: 6px solid black;
            height: 100%;
          }

          .textField {
            width: 50%;
            padding: 12px 20px;
            margin: 8px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          button[type=submit] {
            background-color: var(--greenapple);
            color: white;
            padding: 14px 20px;
            margin 8px 0;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .weaponGrid {
            display: grid;
            grid-template-columns: 50% 50%;
          }
        `}</style>
      </Layout>
    );
  }
}

export default quake;