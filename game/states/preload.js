
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.spritesheet('blackhole', 'assets/blackhole.png', 64, 64, 4);
    this.load.image('trash', 'assets/trash/space_pipe.png');
    this.load.image('battery', 'assets/battery.png');
    this.load.image('opening-text', 'assets/opening-text.png');
    this.game.load.image('starfield', 'assets/space_background-01.png');
    this.game.load.spritesheet('crosshair', 'assets/crosshair.png', 32, 32, 20);
    this.game.load.image('power', 'assets/power_bar_battery.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('intro');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
