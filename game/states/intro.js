'use strict';
function Intro() {}

Intro.prototype = {
  preload: function () {

  },

  create: function () {
    this.game.load.spritesheet('opening-text', 'assets/opening-text.png', 32, 32);
    this.openingText = this.game.add.sprite(130, 600, 'opening-text');
  },

  update: function () {
    if (this.openingText.y > 7) {
      this.openingText.y -= 0.85;
    }

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = Intro;
