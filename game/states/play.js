  var BlackHole = require('../objects/black-hole.js');
  var Trash = require('../objects/trash.js');
  var Player = require('../objects/player.js');
  var Hud = require('../objects/hud.js');
  var TrashSpawner = require('../objects/trash-spawner.js');
  var Shop = require('../objects/shop.js');

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);

      this.game.physics.p2.setImpactEvents(true);

      this.timer = this.game.time.create(true);
      this.timer.start();
      this.timer.loop(1000, this.createTrash, this);

      this.game.stage.setBackgroundColor = '#ffffff';
      this.starfield = this.game.add.tileSprite(0, 0, 3200, 2400, 'starfield');
      this.starfield2 = this.game.add.tileSprite(0, -400, 3200, 2400, 'starfield');

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

      this.trashSpawner = this.createTrashSpawner();
      this.timer.loop(5000, this.createTrashSpawner, this);

      this.game.input.onDown.add(this.createBlackHole, this);

      this.hud = new Hud(this.game, this.player).create();

      this.playMusic = this.game.add.audio('play');
      this.playMusic.play();

      this.trashHitSound = this.game.add.audio('trash-hit');
      this.siren = this.game.add.audio('siren');
      this.coinSound = this.game.add.audio('coin');

      this.timer.loop(30000, this.shopAlert, this);
    },

    update: function() {
      this.player.sprite.bringToTop();
      this.starfield.tilePosition.x -= 1;
      this.starfield2.tilePosition.x -= 1.5;
      this.trash.forEachAlive(this.moveTrash, this);
      this.trash.forEachAlive(this.shrink, this);
      this.trash.forEach(this.updateTrash, this);
      this.hud.update();

      this.player.update();
      this.trashSpawner.update();

      if (typeof this.blackhole !== 'undefined') { this.blackhole.object.update(); }
    },

    shopAlert: function() {
      var style = { font: "40px arcade-classic", fill: "#FF0000", align: "center" };
      this.powerText = this.game.add.text(400, 300, "SHOP AVAILABLE", style);
      this.powerText.anchor.setTo(0.5);
      this.game.time.events.repeat(500, 11, this.flashShopText, this);

      this.hud.createShopButton();
    },

    flashShopText: function() {
      if (this.powerText.text === " ") {
        this.powerText.text = "SHOP AVAILABLE";
      } else {
        this.powerText.text = " ";
      }
    },

    updateTrash: function(trash) {
      if(trash.x < -18 || trash.y < -30 || trash.y > 630) {
        if (trash.alive) {
          trash.kill();
        }
      }
    },

    damagePlayer: function(trash) {
      this.player.changeHealth(trash.object.damageAmount);
    },

    createTrash: function() {
      var trash = new Trash(this.game, this.player, this.trashSpawner.getRandomTrash()).create();

      trash.body.setCollisionGroup(this.trashCollisionGroup);
      trash.body.collides(this.blackholeCollisionGroup);

      this.trash.add(trash);
    },

    createTrashSpawner: function() {
      return new TrashSpawner(this.game, this.player, this.trash).create();
    },

    shrink: function(trash) {
      if (typeof this.blackhole !== 'undefined' && this.blackhole.alive) {
        trash.object.shrink(this.blackhole);
      }
    },

    moveTrash: function(trash) {
      if (typeof this.blackhole !== 'undefined' && this.blackhole.alive) {
        trash.object.accelerateTo(this.blackhole, 30);
      }
    },

    createBlackHole: function() {
      if (this.player.sprite.animations.currentAnim.name === "reload") {
        return false;
      }

      if (typeof this.blackhole !== 'undefined') {
        this.blackhole.destroy();
      }

      if (this.player.shopping === false) {
        this.blackhole = new BlackHole(this.game).create();

        this.blackhole.body.setCollisionGroup(this.blackholeCollisionGroup);
        this.blackhole.body.collides(this.trashCollisionGroup, this.consumeTrash, this);

        this.blackholes.add(this.blackhole);

        this.player.reload();
      }
    },

    sirenPlaying: false,

    consumeTrash: function(body1, body2) {
      // Possible bug: This seems to get called twice sometimes, so don't want
      // it destroying something that's null.
      if (body2.sprite) {
        if (body2.sprite.object.player.power) {
          body2.sprite.object.player.power += body2.sprite.object.healAmount;
          body2.sprite.object.player.cash += body2.sprite.object.cashAmount;
          console.log(body2.sprite.object.cashAmount);
          if(body2.sprite.object.cashAmount > 0) {
            this.coinSound.volume = 0.2;
            this.coinSound.play();
          }
        } else {
          body2.sprite.object.player.power = 100;
        }

        this.trashHitSound.volume = 0.2;
        this.trashHitSound.play();
        body2.sprite.destroy();
      }
    }
  };

  module.exports = Play;
