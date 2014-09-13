function BlackHole(game) {
  this.game = game;
  this.sprite = null;
}

BlackHole.prototype = {
  preload: function() {
    this.game.load.spritesheet('blackhole', 'assets/blackhole.png', 64, 64, 4);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.game.input.activePointer.worldX-32, this.game.input.activePointer.worldY-32, 'blackhole');
    this.sprite.animations.add('pulse');
    this.sprite.animations.play('pulse', 2, true);

    this.game.physics.arcade.enable(this.sprite);
  },

  update: function() {

  },
};

module.exports = BlackHole;
