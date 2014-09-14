(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'spacegarbagewarrior2988');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":5,"./states/gameover":6,"./states/menu":7,"./states/play":8,"./states/preload":9}],2:[function(require,module,exports){
function BlackHole(game) {
  this.game = game;
  this.sprite = null;
}

BlackHole.prototype = {
  preload: function() {
    this.game.load.spritesheet('blackhole', 'assets/blackhole.png', 64, 64, 4);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.game.input.activePointer.worldX, this.game.input.activePointer.worldY, 'blackhole');
    this.sprite.scale.setTo(2);
    this.sprite.animations.add('pulse');
    this.sprite.animations.play('pulse', 12, true);

    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.static = true;
    this.sprite.body.setRectangle(1, 1, 0, 0, 0);
    return this.sprite;
  },

  update: function() {

  },

  consumed: function() {
    console.log('testinggg attention please!');
  }
};

module.exports = BlackHole;

},{}],3:[function(require,module,exports){
function Player(game) {
  this.game = game;
  this.sprite = null;
}

Player.prototype = {
  preload: function() {
    this.game.load.spritesheet('crosshair', 'assets/crosshair.png', 32, 32);
  },

  create: function() {
    this.sprite = this.game.add.sprite(this.game.input.activePointer.worldX - 32, this.game.input.activePointer.worldY - 32, 'crosshair');
    this.sprite.animations.add('pulse', [1,2,3], 4, true);

    var reloadAnimation = this.sprite.animations.add('reload', [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19], 2, false);
    reloadAnimation.onComplete.add(this.pulseLoaded, this);

    this.sprite.animations.play('pulse');

    this.sprite.scale.setTo(2);

    return this.sprite;
  },

  update: function() {
    this.sprite.x = this.game.input.activePointer.worldX - 32;
    this.sprite.y = this.game.input.activePointer.worldY - 32;
  },

  reload: function() {
    this.sprite.animations.play('reload');
  },

  pulseLoaded: function(sprite, animation) {
    sprite.animations.play('pulse');
  }
};

module.exports = Player;

},{}],4:[function(require,module,exports){
function Trash(game) {
  this.game = game;
  this.sprite = null;
  this.pointValue = 10;
}

Trash.prototype = {
  preload: function() {
    this.game.load.image('trash', 'assets/trash/hamburger.png');
  },

  create: function() {
    var x = Math.floor((Math.random() * 800) + 1)
    var y = Math.floor((Math.random() * 600) + 1)

    this.sprite = this.game.add.sprite(x, y, 'trash');
    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.collideWorldBounds = false;
    this.sprite.object = this;

    var rotation = Math.random() * 360;
    this.sprite.body.rotation = rotation;

    return this.sprite;
  },

  update: function() {


  },

  accelerateTo: function(blackhole, speed) {
    if (typeof speed === 'undefined') { speed = 60; }

    var angle = Math.atan2(blackhole.y - this.sprite.y, blackhole.x - this.sprite.x);

    this.sprite.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
    this.sprite.body.force.y = Math.sin(angle) * speed;
  },

  shrink: function(blackhole) {
    var a = blackhole.x - this.sprite.body.x;
    var b = blackhole.y - this.sprite.body.y;
    var distance = Math.sqrt(a*a + b*b);

    if (distance < 100) {
      this.sprite.scale.setTo(0.01 * distance);
    }
  }
};

module.exports = Trash;

},{}],5:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],6:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],7:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],8:[function(require,module,exports){
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
      if (this.player.sprite.animations.currentAnim.name === "reload") {
        return false;
      } 

      if (typeof this.blackhole !== 'undefined') {
        this.blackhole.destroy();
      }

      this.blackhole = new BlackHole(this.game).create();

      this.blackhole.body.setCollisionGroup(this.blackholeCollisionGroup);
      this.blackhole.body.collides(this.trashCollisionGroup, this.consumeTrash, this);

      this.blackholes.add(this.blackhole);

      this.player.reload();
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

},{"../objects/black-hole.js":2,"../objects/player.js":3,"../objects/trash.js":4}],9:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.spritesheet('blackhole', 'assets/blackhole.png', 64, 64, 4);
    this.load.image('trash', 'assets/trash/hamburger.png');
    this.game.load.image('starfield', 'assets/space_background-01.png');
    this.game.load.spritesheet('crosshair', 'assets/crosshair.png', 32, 32, 20);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])