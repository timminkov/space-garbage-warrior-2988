function Player(game) {
  this.game = game;
  this.sprite = null;
  this.power = 100;
  this.cash = 0;
  this.reloadSpeed = 2;
  this.hasReloadUpgrade = false;
  this.shopping = false;
}

Player.prototype = {
  preload: function() {
    this.game.load.spritesheet('crosshair', 'assets/crosshair.png', 32, 32);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.game.input.activePointer.worldX - 32, this.game.input.activePointer.worldY - 32, 'crosshair');
    this.sprite.animations.add('pulse', [1,2,3], 4, true);

    var reloadAnimation = this.sprite.animations.add('reload', [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], this.reloadSpeed, false);
    reloadAnimation.onComplete.add(this.pulseLoaded, this);

    this.sprite.animations.play('pulse');

    this.sprite.scale.setTo(2);
    this.object = this;
    this.siren = this.game.add.audio('siren');
    this.siren.volume = 0.5;

    this.game.time.events.loop(Phaser.Timer.SECOND, function() {
     this.power -= 1;
      if (this.power <= 10) {
        if (this.sirenPlaying === false) {
          this.siren.play();
        }
        this.sirenPlaying = true;
      } else  {
        this.siren.stop();
        this.sirenPlaying = false;
      }
    }, this);

    this.reloadSound = this.game.add.audio('reload');
    return this.sprite;
  },

  update: function() {
    this.sprite.x = this.game.input.activePointer.worldX - 32;
    this.sprite.y = this.game.input.activePointer.worldY - 32;
  },

  sirenPlaying: false,

  reload: function() {
    this.sprite.animations.play('reload');
  },

  pulseLoaded: function(sprite, animation) {
    this.reloadSound.play();
    sprite.animations.play('pulse');
  },
};

module.exports = Player;
