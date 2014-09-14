function BlackHole(game) {
  this.game = game;
  this.sprite = null;
}

BlackHole.prototype = {
  preload: function() {
    // this.game.load.spritesheet('blackhole', 'assets/blackhole.png', 64, 64, 4);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 'blackhole');
    this.sprite.scale.setTo(0.2);

    this.sprite.animations.add('pulse');
    this.sprite.animations.play('pulse', 12, true);

    this.game.physics.p2.enable(this.sprite);

    this.sprite.body.static = true;
    this.sprite.body.setRectangle(1, 1, 0, 0, 0);

    this.sprite.object = this;

    return this.sprite;
  },

  update: function() {
    if (this.sprite.scale.x < 2) {
      this.sprite.scale.x += 0.02;
      this.sprite.scale.y += 0.02;
    }
  }
};

module.exports = BlackHole;
