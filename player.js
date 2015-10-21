Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.force = {x:0.0, y:0.0};

function Player(game, x, y, cursors) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.frame = 4;
    this.health = 10;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 700;
    this.body.mass = 0;
    this.body.collideWorldBounds = true;
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    this.cursors = cursors;
    game.add.existing(this);
}

Player.prototype.update = function() {
    //this.game.physics.arcade.collide(this, this.platformLayer);
    this.body.velocity.x = 0;
    //this.body.velocity.y = 0;
    if (this.cursors.left.isDown) {
        this.body.velocity.x = -250;
        this.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
        this.body.velocity.x = 250;
        this.animations.play('right');
    }
    else {
        this.animations.stop();
    }

    if (this.cursors.up.isDown && this.body.blocked.down) {
        this.health -= 1;
        this.body.velocity.y = -600;
    }
}
