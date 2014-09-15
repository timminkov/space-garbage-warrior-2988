
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },

  create: function () {
    var style2 = { font: "100px arcade-classic", fill: "#790091", align: "center" };
    this.powerText = this.game.add.text(400, 300, "GAME OVER", style2);
    this.powerText.anchor.setTo(0.5);
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('intro');
    }
  }
};
module.exports = GameOver;
