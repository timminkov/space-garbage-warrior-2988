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

    var trash = this.game.add.sprite(x, y, 'trash');
    this.game.physics.arcade.enable(trash);
    trash.body.velocity.x = Math.floor((Math.random() * 50) + 1);
    trash.body.velocity.y = Math.floor((Math.random() * 50) + 1);
    return trash;
  },

  update: function() {

  },
};

module.exports = Trash;
