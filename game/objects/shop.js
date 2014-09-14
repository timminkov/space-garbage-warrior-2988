function Shop(game, player) {
  this.game = game;
  this.player = player;
  this.sprite = null;
  this.reloadAvailable = player.hasReloadUpgrade;
}

Shop.prototype = {
  preload: function() {

  },

  create: function() {
    this.player.shopping = true;
    this.shopBackground = this.game.add.sprite(this.game.world.centerX, 450, 'shop');
    this.shopBackground.anchor.setTo(0.5, 1);
    this.shopBackground.height = 0;

    var tween = this.game.add.tween(this.shopBackground).to( { height: 300}, 2000, Phaser.Easing.Bounce.Out, false, 0, 0).start();
    tween.onComplete.add(this.createButtonsAndText, this);
  },

  update: function() {

  },

  createButtonsAndText: function() {
    if (this.player.hasReloadUpgrade === false) {
      this.reloadButton = this.game.add.button(226, 330, 'black-button', this.buyReloadUpgrade, this, 0, 1, 2, 1);
    }
    var style = { font: "40px arcade-classic", fill: "#FF0000", align: "center" };
    this.shopTitle = this.game.add.text(350, 160, "S  H  O  P", style);

    this.closeButton = this.game.add.button(340, 355, 'close-button', this.closeShop, this, 1, 0, 2);
    this.closeButton.scale.setTo(2, 2);
  },

  buyReloadUpgrade: function() {
    if (this.player.cash >= 50) {
      this.player.hasReloadUpgrade = true;
      this.player.cash -= 50;
      this.reloadSpeed = 4;
      this.button.kill();
    }
  },

  closeShop: function() {
    this.reloadButton.destroy();
    this.shopTitle.destroy();
    this.shopBackground.destroy();
    this.closeButton.destroy();
    this.player.shopping = false;
  },
};

module.exports = Shop;
