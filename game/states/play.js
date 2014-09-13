  var BlackHole = require('../objects/black-hole.js');
  var Trash = require('../objects/trash.js');


  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.timer = this.game.time.create(true);
      this.timer.start();
      this.timer.loop(1000, this.createTrash, this);
    },

    update: function() {
      if (this.game.input.activePointer.isDown) {
        this.createBlackHole();
      }
    },

    createTrash: function() {
      var trash = new Trash(this.game).create();

      if (this.blackhole) {
        trash.body.gravity = new Phaser.Point(this.blackhole.x - trash.body.x, this.blackhole.sprite.body.y - trash.body.y);
      }
    },

    createBlackHole: function() {
      this.blackhole = new BlackHole(this.game);
      this.blackhole.create();
    }
  };

  module.exports = Play;
