import React, { Component } from 'react';

const weapons = [
  {
    key: 'Gauntlet',
    path: '/quake/gaunt.png'
  }, 
  {
    key: 'Machine Gun',
    path: "/quake/mg.png"
  },
  {
    key: 'Heavy Machine Gun',
    path: "/quake/hmg.png"
  },
  {
    key: 'Shotgun',
    path: "/quake/sg.png"
  },
  {
    key: 'Super Shotgun',
    path: "/quake/ssg.png"
  },
  {
    key: 'Nailgun',
    path: "/quake/ng.png"
  },
  {
    key: 'Super Nailgiun',
    path: "/quake/sng.png"
  },
  {
    key: 'Tribolt',
    path: "/quake/tri.png"
  },
  {
    key: 'Rocket Launcher',
    path: "/quake/rl.png"
  },
  {
    key: 'Lightning Gun',
    path: "/quake/lg.png"
  },
  {
    key: 'Railgun',
    path: "/quake/rail.png"
  }
];

class gunLoop extends Component {
  render() {
   return weapons.map((wep, key) => (
     <div key={key} style={{display: 'inline-block'}}>
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