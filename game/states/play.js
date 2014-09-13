  var BlackHole = require('../objects/black-hole.js');
  var Trash = require('../objects/trash.js');

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

      this.timer = this.game.time.create(true);
      this.timer.start();
      this.timer.loop(1000, this.createTrash, this);

      this.starfield = this.game.add.tileSprite(0, 0, 3200, 2400, 'starfield');
      this.blackholes = this.game.add.group();
      this.trash = this.game.add.group();

      this.game.input.onDown.add(this.createBlackHole, this);
    },

    update: function() {
      this.starfield.tilePosition.x -= 1;
      this.trash.forEachAlive(this.moveTrash, this);
      this.trash.forEachAlive(this.shrink, this);
    },

    createTrash: function() {
      var trash = new Trash(this.game).create();
      this.trash.add(trash);
    },

    shrink: function(trash) {
      if (typeof this.blackhole !== 'undefined') {
        trash.object.shrink(this.blackhole);
      }
    },

    moveTrash: function(trash) {
      if (typeof this.blackhole !== 'undefined') {
        trash.object.accelerateTo(this.blackhole, 30);
      }
    },

    createBlackHole: function() {
      if (typeof this.blackhole !== 'undefined') {
        this.blackhole.destroy();
      }

      this.blackhole = new BlackHole(this.game).create();
      this.blackholes.add(this.blackhole);
    }
  };

  module.exports = Play;
