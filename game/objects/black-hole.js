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

    this.sprite.body.setCircle(32, 0, 0, 0);

    this.sprite.object = this;
    this.timeCreated = this.game.time.now;
    this.game.time.events.add(6000, this.collapse, this);

    this.fireSound = this.game.add.audio('blackhole');
    this.fireSound.play();

    return this.sprite;
  },

  update: function() {
    if (this.sprite.scale.x < 2) {
      this.sprite.scale.x += 0.02;
      this.sprite.scale.y += 0.02;
    }

    this.sprite.body.velocity.y = 0;
    this.sprite.body.velocity.x = 0;

    if ((this.game.time.elapsedSecondsSince(this.timeCreated)) > 5) {
      this.sprite.scale.x -= 0.05;
      this.sprite.scale.y -= 0.05;
    }
  },

  collapse: function() {
    this.fireSound.stop();
    this.sprite.kill();
    this.sprite.destroy();
  },
};

module.exports = BlackHole;
