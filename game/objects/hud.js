var Shop = require('../objects/shop.js');

function Hud(game, player) {
  this.game = game;
  this.sprite = null;
  this.player = player;
  this.shopButtonExists = false;
}

Hud.prototype = {
  preload: function() {
    this.game.load.image('power', 'assets/power_bar_battery.png');
  },

  create: function() {
    this.power = this.game.add.sprite(-110, 270, 'power');

    this.cropPower = new Phaser.Rectangle(0, 0, this.power.width, 320);
    this.power.crop(this.cropPower);
    this.powerSize = 320;

    var style = { font: "65px arcade-classic", fill: "#ff0044", align: "center" };
    this.coins = this.game.add.text(100, 540, "0", style);

    var style2 = { font: "40px arcade-classic", fill: "#790091", align: "center" };
    this.powerText = this.game.add.text(34, 540, "P   O   W   E   R", style2);
    this.powerText.angle = 270;

    return this;
  },

  update: function() {
    this.power.y = 600 - this.powerSize;
    this.cropPower.setTo(0, 0, this.power.width, this.powerSize);
    this.powerSize = this.player.power * 3.2;
    this.coins.text = this.player.cash;
  },

  createShopButton: function() {
    if (this.shopButtonExists === false) {
      this.shopButtonExists = true;
      this.shopButton = this.game.add.button(200, 500, 'green-button', this.openShop, this, 0, 1, 2, 1);
      this.shopButton.scale.setTo(2, 2);

      var style = { font: "32px arcade-classic", fill: "#000000", align: "center" };
      this.shopText = this.game.add.text(230, 540, "SHOP", style);
    }
  },

  openShop: function() {
    this.shopButton.destroy();
    this.shopText.destroy();
    this.shopButtonExists = false;

    if (this.player.shopping === false) {
      new Shop(this.game, this.player).create();
    }
  }
};

module.exports = Hud;
