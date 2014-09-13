function Trash(game) {
  this.game = game;
  this.sprite = null;
}

Trash.prototype = {
  preload: function() {
    this.game.load.image('trash', 'assets/ball.png');
  },

  create: function() {
    var x = Math.floor((Math.random() * 600) + 1)
    var y = Math.floor((Math.random() * 800) + 1)

    var sprite = this.game.add.sprite(x, y, 'trash');
    this.game.physics.p2.enable(sprite);
    sprite.body.collideWorldBounds = true;

    return sprite;
  },

  update: function() {

  },
};

module.exports = Trash;
