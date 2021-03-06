function Trash(game, player, trashType) {
  this.game = game;
  this.sprite = null;
  this.pointValue = 10;
  this.cashAmount = 0;
  this.healAmount = 2;
  if (trashType === 'trash-battery') {
    this.healAmount = 20;
  } else if (trashType ==='trash-cash') {
    this.cashAmount = 1;
    this.healAmount = 0;
  }
  this.player = player;
  this.trashType = trashType;
}

Trash.prototype = {
  preload: function() {
    // this.game.load.image('trash', 'assets/battery.png');
  },

  create: function(x, y) {
    var y = Math.floor((Math.random() * 600) + 1)

    this.sprite = this.game.add.sprite(850, y, this.trashType);

    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.collideWorldBounds = false;
    this.sprite.object = this;

    var randomVelocity = (Math.random() * 800) + 100;
    this.sprite.body.velocity.x = -200;

    var rotation = Math.random() * 360;
    this.sprite.body.rotation = rotation;

    return this.sprite;
  },

  update: function() {
  },


  accelerateTo: function(blackhole, speed) {
    if (typeof speed === 'undefined') { speed = 60; }

    var angle = Math.atan2(blackhole.y - this.sprite.y, blackhole.x - this.sprite.x);

    var distance = this.distanceTo(blackhole);
    this.sprite.body.force.x = Math.cos(angle) * (speed / Math.log(Math.pow(distance, (1 / 10))));
    this.sprite.body.force.y = Math.sin(angle) * ((speed / Math.log(Math.pow(distance, (1 / 10)))));
  },

  shrink: function(blackhole) {
    var distance = this.distanceTo(blackhole);

    if (distance < 300) {
      this.sprite.scale.setTo(0.02 * distance/6);
    }
  },

  distanceTo: function(blackhole) {
    var a = blackhole.x - this.sprite.body.x;
    var b = blackhole.y - this.sprite.body.y;
    return Math.sqrt(a*a + b*b);
  }
};

module.exports = Trash;
