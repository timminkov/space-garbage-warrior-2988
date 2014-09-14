function Hud(game, player) {
  this.game = game;
  this.sprite = null;
  this.player = player;
}

Hud.prototype = {
  preload: function() {
    this.game.load.image('power', 'assets/power_bar_battery.png');
  },

  create: function() {
    //var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    //this.health = this.game.add.text(50, 570, this.player.power, style);
    //this.health.anchor.set(0.5);

    this.power = this.game.add.sprite(-110, 270, 'power');

    this.cropPower = new Phaser.Rectangle(0, 0, this.power.width, 320);
    this.power.crop(this.cropPower);
    this.powerSize = 320;

    return this;
  },

  update: function() {
    //this.health.text = this.player.power;
    this.power.y = 600 - this.powerSize;
    this.cropPower.setTo(0, 0, this.power.width, this.powerSize);
    this.powerSize = this.player.power * 3.2;
  },
};

module.exports = Hud;
