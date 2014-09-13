
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.timer = this.game.time.create(true);
      this.timer.start();
      this.timer.loop(1000, this.createBall, this);
    },

    update: function() {
      if (this.game.input.activePointer.isDown) {
        this.createBlackHole();
      }
    },

    createBall: function() {
      var x = Math.floor((Math.random() * 600) + 1)
      var y = Math.floor((Math.random() * 800) + 1)

      var ball = this.game.add.sprite(x, y, 'ball');
      this.game.physics.arcade.enable(ball);
      ball.body.velocity.x = Math.floor((Math.random() * 10) + 1);
      ball.body.velocity.y = Math.floor((Math.random() * 10) + 1);
    },

    createBlackHole: function() {
      this.blackHole = this.game.add.sprite(this.game.input.activePointer.worldX-32, this.game.input.activePointer.worldY-32, 'blackhole');
      this.blackHole.animations.add('pulse');
      this.blackHole.animations.play('pulse', 2, true);

      this.game.physics.arcade.enable(this.blackHole);
    }
  };

  module.exports = Play;
