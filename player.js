Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.force = {x:0.0, y:0.0};

function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.frame = 4;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 1600;
    this.body.collideWorldBounds = true;
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
    game.add.existing(this);
}

Player.prototype.update = function() {
    game.physics.arcade.collide(this, platforms);
    player.body.velocity.x = 0;
    //player.body.velocity.y = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        player.animations.stop();
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -700;
    }
}
