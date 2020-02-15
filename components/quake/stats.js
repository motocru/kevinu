import React, { Component } from 'react';

class stats extends Component {

  /**returns the weapon name as represented inside of the JSON values that 
   * they are stored as
   */
  gunJsonName = (gun) => {
    switch(gun) {
      case 'Gauntlet':
        return 'GAUNTLET';
      case 'Machine Gun':
        return 'MACHINEGUN';
      case 'Heavy Machine Gun':
        return 'MACHINEGUN_GRADE1';
      case 'Shotgun':
        return 'SHOTGUN';
      case 'Super Shotgun':
        return 'SHOTGUN_GRADE1';
      case 'Nailgun':
        return 'NAILGUN';
      case 'Super Nailgiun':
        return 'NAILGUN_GRADE1';
      case 'Tribolt':
        return 'LAGBOLT';
      case 'Rocket Launcher':
        return 'ROCKET_LAUNCHER';
      case 'Lightning Gun':
        return 'LIGHTNING_GUN';
      case 'Railgun':
        return 'RAILGUN';
    }
  }

  /**loops over the list of given champiions (if valid) and then returns
   * an object with all calculated values of importance
   */
  loopChampionsAndGrabStats = (gun, player) => {
    if (JSON.stringify(player) === '{}') return {accuracy:'N/A', damage:'N/A', kills:'N/A', headshots:'N/A'};
    var hits = 0;
    var shots = 0;
    var damage = 0;
    var kills = 0;
    var headshots = 0;
    var champions = player.playerProfileStats.champions;
    for (var champ in champions) {
      //console.log(parseInt(champions[champ].damageStatusList[gun].hits, 10));
      hits += parseInt(champions[champ].damageStatusList[gun].hits, 10);
      shots += parseInt(champions[champ].damageStatusList[gun].shots, 10);
      damage += parseInt(champions[champ].damageStatusList[gun].damage, 10);
      kills += parseInt(champions[champ].damageStatusList[gun].kills, 10);
      headshots += parseInt(champions[champ].damageStatusList[gun].headshots, 10);
    }
    //var accuracy = (hits / shots)
    //console.log(`total hits: ${Number(hits)}`);
    var accuracy = (hits/shots)*100
    return {accuracy:accuracy.toFixed(2), damage:damage, kills:kills, headshots:headshots};
  }

  render() {
    const gunStats = this.loopChampionsAndGrabStats(this.gunJsonName(this.props.gun), this.props.player);
    
    return(
      <div className="centered">
        <h3>Current Weapon:<br />{this.props.gun}</h3><br />
        <h4>Accuracy: {gunStats.accuracy}%</h4>
        <h4>Kills: {gunStats.kills}</h4>
        <h4>Headshots: {gunStats.headshots}</h4>
        <h4>Total damage: {gunStats.damage}</h4>
      </div>
    );
  }
}
export default stats;