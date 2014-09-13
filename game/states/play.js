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
    },

    createTrash: function() {
      var trash = new Trash(this.game).create();
      this.trash.add(trash);
      if (this.blackhole) {
        trash.body.gravity = new Phaser.Point(this.blackhole.body.x - trash.body.x, this.blackhole.body.y - trash.body.y);
      }
    },

    moveTrash: function(trash) {
      this.accelerateToBlackHole(trash, 30);
    },

    accelerateToBlackHole: function(trash, speed) {
      if (typeof speed === 'undefined') { speed = 60; }
      var angle = Math.atan2(this.blackhole.y - trash.y, this.blackhole.x - trash.x);
      trash.body.rotation = angle + this.game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
      trash.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
      trash.body.force.y = Math.sin(angle) * speed;
    },

    createBlackHole: function() {
      this.blackhole = new BlackHole(this.game).create();
      this.blackholes.add(this.blackhole);
    }
  };

  module.exports = Play;
