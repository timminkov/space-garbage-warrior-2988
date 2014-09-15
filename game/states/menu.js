
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },

  create: function() {
    this.starfield = this.game.add.tileSprite(0, 0, 3200, 2400, 'starfield');
    this.starfield2 = this.game.add.tileSprite(-400, 0, 3200, 2400, 'starfield');

    var sprite = this.game.add.sprite(0, 0, 'title');
    sprite.alpha = 0;

    this.game.add.tween(sprite).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0);
    this.sound = this.game.add.audio('menu');
    this.sound.play();

  },

  update: function() {
    this.starfield.tilePosition.y -= 0.1;
    this.starfield2.tilePosition.y -= 0.15;

    if(this.game.input.activePointer.justPressed()) {
      this.sound.stop();
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
