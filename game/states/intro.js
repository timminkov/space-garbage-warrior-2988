
'use strict';
function Intro() {}

Intro.prototype = {
  preload: function () {

  },
  create: function () {
    // var style = { font: '15px Arial', fill: '#ffffff', align: 'center'};
    // this.titleText = this.game.add.text(this.game.world.centerX, 400, 'Game Over!', style);
    // this.titleText.anchor.setTo(0.5, 0.5);

    this.game.load.spritesheet('opening-text', 'assets/opening-text.png', 32, 32);
    this.openingText = this.game.add.sprite(130, 600, 'opening-text');
  },
  update: function () {
    console.log(this.openingText.x);
    if (this.openingText.y > 7) {
      this.openingText.y --;
    } 

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = Intro;
