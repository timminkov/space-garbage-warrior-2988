
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      require('./objects/black-hole.js');
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
      ball.body.velocity.x = Math.floor((Math.random() * 50) + 1);
      ball.body.velocity.y = Math.floor((Math.random() * 50) + 1);
      if (this.blackhole) {
        ball.body.gravity = new Phaser.Point(this.blackhole.x - ball.body.x, this.blackhole.body.y - ball.body.y);
      }
      //ball.body.gravity = ball.body.gravity.normalize().multiply(100, 100);
    },

    createBlackHole: function() {
      this.blackhole = new BlackHole(this.game);
      this.blackhole.create();
    }
  };

  module.exports = Play;
