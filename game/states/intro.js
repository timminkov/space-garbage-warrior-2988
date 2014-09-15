'use strict';
function Intro() {}

Intro.prototype = {
  preload: function () {

  },

  create: function () {
    this.game.load.spritesheet('opening-text', 'assets/opening-text.png', 32, 32);
    this.openingText = this.game.add.sprite(0, 600, 'opening-text');
    this.sound = this.game.add.audio('intro', 1, true);
    this.sound.play();
  },

  update: function () {
    if (this.openingText.y > 7) {
      this.openingText.y -= 0.85;
    }

    if (this.game.input.activePointer.justPressed()) {
      this.sound.stop();
      this.game.state.start('menu');
    }
  }
};
module.exports = Intro;
