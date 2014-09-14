var Trash = require('../objects/trash.js');

function TrashSpawner(game, player, trashGroup) {
  this.game = game;
  this.sprite = null;
  this.player = player;
  this.trashGroup = trashGroup;
}

TrashSpawner.prototype = {
  SPRITES: [
    'trash-hamburger',
    'trash-pipe',
    'trash-cash'
  ],

  preload: function() {

  },

  create: function() {
    this.x = 850;
    this.y = Math.floor((Math.random() * 600) + 1);
    this.game.time.events.repeat(300, 5, this.createTrash, this);
    this.timeCreated = this.game.time.now;
    this.object = this;

    return this;
  },

  update: function() {
  },

  createTrash: function() {
    var y = Math.floor((Math.random() * 25) + this.y);
    var trash = new Trash(this.game, this.player, this.getRandomTrash()).create(this.x, y);
    this.trashGroup.add(trash);
  },

  getRandomTrash: function() {
    var randomSprite = this.game.rnd.integerInRange(0, this.SPRITES.length - 1);
    return this.SPRITES[randomSprite];
  }
};

module.exports = TrashSpawner;
