function Hud(game, player) {
  this.game = game;
  this.sprite = null;
  this.player = player;
}

Hud.prototype = {
  preload: function() {
  },

  create: function() {
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    this.health = this.game.add.text(50, 570, this.player.power, style);
    this.health.anchor.set(0.5);
    return this;
  },

  update: function() {
    this.health.text = this.player.power;
  },
};

module.exports = Hud;
