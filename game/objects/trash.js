function Trash(game) {
  this.game = game;
  this.sprite = null;
  this.pointValue = 10;
}

Trash.prototype = {
  preload: function() {
    this.game.load.image('trash', 'assets/trash/hamburger.png');
  },

  create: function() {
    var x = Math.floor((Math.random() * 800) + 1)
    var y = Math.floor((Math.random() * 600) + 1)

    this.sprite = this.game.add.sprite(x, y, 'trash');
    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.collideWorldBounds = false;
    this.sprite.object = this;

    var rotation = Math.random() * 360;
    this.sprite.body.rotation = rotation;

    return this.sprite;
  },

  update: function() {


  },

  accelerateTo: function(blackhole, speed) {
    if (typeof speed === 'undefined') { speed = 60; }

    var angle = Math.atan2(blackhole.y - this.sprite.y, blackhole.x - this.sprite.x);

    this.sprite.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
    this.sprite.body.force.y = Math.sin(angle) * speed;
  },

  shrink: function(blackhole) {
    var a = blackhole.x - this.sprite.body.x;
    var b = blackhole.y - this.sprite.body.y;
    var distance = Math.sqrt(a*a + b*b);

    if (distance < 100) {
      this.sprite.scale.setTo(0.01 * distance);
    }
  }
};

module.exports = Trash;
