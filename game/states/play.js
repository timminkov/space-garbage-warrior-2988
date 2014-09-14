  var BlackHole = require('../objects/black-hole.js');
  var Trash = require('../objects/trash.js');
  var Player = require('../objects/player.js');

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

      this.game.physics.p2.setImpactEvents(true);

      this.timer = this.game.time.create(true);
      this.timer.start();
      this.timer.loop(1000, this.createTrash, this);

      this.starfield = this.game.add.tileSprite(0, 0, 3200, 2400, 'starfield');

      this.blackholeCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.trashCollisionGroup = this.game.physics.p2.createCollisionGroup();

      this.game.physics.p2.updateBoundsCollisionGroup();

      this.blackholes = this.game.add.group();
      this.blackholes.enableBody = true;
      this.blackholes.physicsBodyType = Phaser.Physics.P2JS;

      this.trash = this.game.add.group();
      this.trash.enableBody = true;
      this.trash.physicsBodyType = Phaser.Physics.P2JS;
      this.player = new Player(this.game);
      this.player.create();

      this.game.input.onDown.add(this.createBlackHole, this);

      this.score = 0;
    },

    update: function() {
      this.starfield.tilePosition.x -= 1;
      this.trash.forEachAlive(this.moveTrash, this);
      this.trash.forEachAlive(this.shrink, this);

      this.player.update();
    },

    createTrash: function() {
      var trash = new Trash(this.game).create();

      trash.body.setCollisionGroup(this.trashCollisionGroup);
      trash.body.collides(this.blackholeCollisionGroup);

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

      this.blackhole.body.setCollisionGroup(this.blackholeCollisionGroup);
      this.blackhole.body.collides(this.trashCollisionGroup, this.consumeTrash, this);

      this.blackholes.add(this.blackhole);
    },

    consumeTrash: function(body1, body2) {
      // Possible bug: This seems to get called twice sometimes, so don't want
      // it destroying something that's null.
      if (body2.sprite) {
        this.score += body2.sprite.object.pointValue;
        body2.sprite.destroy();
      }
    }

  };

  module.exports = Play;
