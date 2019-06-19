import Layout from '../../components/layout';
import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
//import isoFetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

import GunLoop from '../../components/quake/gunLoop';

class quake extends Component {
  state = {
    playerName: '',
    player: null,
    gun: 'gaunt'
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.playerName.length <= 4) {
      alert('All valid player names are greater than 4 characters in length');
      this.setState({playerName: ''});
      return;
    }
    fetch(`https://stats.quake.com/api/v2/Player/Stats?name=${this.state.playerName}`, {
      method: 'get'
    })
    .catch(err => { this.setState({player: null}); this.setState({playerName: ''}); return;})
    .then(res => res.json())
    .then(json => {
      this.setState({playerName: ''});
      if (json.code === 404) { this.setState({player: null}); alert('player name is invalid'); return;}
      console.log(json); 
      this.setState({player: json}); 
    });
  }

  test2 = (e) => {
    e.preventDefault();
    console.log(this.state.player);
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value});

  setGun = (key) => {
    console.log(key);
  }

  render() {
    const isValidPlayer = this.state.player;

    return (
      <Layout>
        <div>
          <h1>Quake Champions Stats page</h1><hr />
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="playerName">Player Name:</label>
              <input type="text" 
                className="form-control" 
                name="playerName" 
                value={this.state.playerName}
                onChange={this.onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <div className="details">
            <div className="row"><br /><br />
              <div className="col-sm-5">
                <h2>Select Your Weapon</h2>
                <GunLoop setGun={this.setGun}/>
              </div>
              <div className="col-sm-7">
                
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          hr {
            display: block;
            height: 1px;
            border: 0;
            border-top: 1px solid #ccc;
            margin: 1em 0;
            padding: 0;
          }
        `}</style>
      </Layout>
    );
  }
}

export default quake;