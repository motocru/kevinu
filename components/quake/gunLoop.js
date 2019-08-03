import React, { Component } from 'react';

const weapons = [
  {
    key: 'Gauntlet',
    path: '../../static/quake/gaunt.png'
  }, 
  {
    key: 'Machine Gun',
    path: "../../static/quake/mg.png"
  },
  {
    key: 'Heavy Machine Gun',
    path: "../../static/quake/hmg.png"
  },
  {
    key: 'Shotgun',
    path: "../../static/quake/sg.png"
  },
  {
    key: 'Super Shotgun',
    path: "../../static/quake/ssg.png"
  },
  {
    key: 'Nailgun',
    path: "../../static/quake/ng.png"
  },
  {
    key: 'Super Nailgiun',
    path: "../../static/quake/sng.png"
  },
  {
    key: 'Tribolt',
    path: "../../static/quake/tri.png"
  },
  {
    key: 'Rocket Launcher',
    path: "../../static/quake/rl.png"
  },
  {
    key: 'Lightning Gun',
    path: "../../static/quake/lg.png"
  },
  {
    key: 'Railgun',
    path: "../../static/quake/rail.png"
  }
];

class gunLoop extends Component {
  render() {
   return weapons.map((wep, key) => (
     <div key={key}>
       <img className="qGuns" src={wep.path} alt={wep.key} onClick={() => this.props.setGun(wep.key)}/>
       <style jsx>{`
      .qGuns {
        display: block;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;
        padding: 10px;
      }
     `}</style>
     </div>
   ));
  }
}
export default gunLoop;