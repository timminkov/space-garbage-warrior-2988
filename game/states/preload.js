
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

    this.load.image('trash-pipe', 'assets/trash/space_pipe.png');
    this.load.image('trash-battery', 'assets/battery.png');
    this.load.image('trash-hamburger', 'assets/trash/hamburger.png');
    this.load.image('trash-cash', 'assets/trash/coin.png');

    this.load.image('opening-text', 'assets/opening-text.png');
    this.game.load.image('starfield', 'assets/space_background-01.png');
    this.game.load.spritesheet('crosshair', 'assets/crosshair.png', 32, 32, 20);
    this.game.load.image('power', 'assets/power_bar_battery.png');
    this.game.load.image('title', 'assets/title.png');

    this.game.load.audio('blackhole', 'assets/sounds/blackhole.ogg');
    this.game.load.audio('play', 'assets/sounds/play.ogg');
    this.game.load.audio('trash-hit', 'assets/sounds/hit3.wav');
    this.game.load.audio('siren', 'assets/sounds/siren.mp3');
    this.game.load.audio('coin', 'assets/sounds/coin.wav');
    this.game.load.audio('reload', 'assets/sounds/reload.wav');
    this.game.load.audio('intro', 'assets/sounds/intro.ogg');
    this.game.load.audio('menu', 'assets/sounds/playmenu2.ogg');


    this.game.load.image('shop', 'assets/shop.png');
    this.game.load.spritesheet('black-button', 'assets/black_button.png', 64, 64);
    this.game.load.spritesheet('close-button', 'assets/closebutton.png', 64, 64);
    this.game.load.spritesheet('green-button', 'assets/green_button.png', 64, 64);
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
