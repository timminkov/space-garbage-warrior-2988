function Player(game) {
  this.game = game;
  this.sprite = null;
}

Player.prototype = {
  preload: function() {
    this.game.load.spritesheet('crosshair', 'assets/crosshair.png', 32, 32, 4);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.game.input.activePointer.worldX - 32, this.game.input.activePointer.worldY - 32, 'crosshair');
    this.sprite.animations.add('pulse');
    this.sprite.animations.play('pulse', 4, true);
    this.sprite.scale.setTo(2);
  },

  update: function() {
    this.sprite.x = this.game.input.activePointer.worldX - 32;
    this.sprite.y = this.game.input.activePointer.worldY - 32;
  }
};

module.exports = Player;
