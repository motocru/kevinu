/**this file serves as a model for the grammarguru games */
function Game(userId, colors, font, level) {
  this.userId = userId;
  this.colors = colors;
  this.font = font;
  this.level = level;
}
module.exports = Game;