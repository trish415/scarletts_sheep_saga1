Sheep.prototype = Object.create(Phaser.Sprite.prototype);
Sheep.prototype.constructor = Sheep;

Sheep.prototype.leftLim = 0;
Sheep.prototype.rightLim = 0;
Sheep.prototype.g = 0;
Sheep.prototype.dx = 0;

var sheepHeights = [3*PLATFORM_HEIGHT, 7*PLATFORM_HEIGHT, 11*PLATFORM_HEIGHT];

function Sheep(game,x,y) {
    Phaser.Sprite.call(this, game, x, y, 'sheep');
    var bX = this.game.world.width;
    // setup animations
    this.frame = Math.floor(Math.random()*7);
    this.animations.add('left', [0,1,2,3], 10,true);
    this.animations.add('right', [4,5,6,7], 10, true);
    // decide random starting points on the platforms
    this.g = Math.floor(Math.random()*3);
    var sheepWidths = [Math.floor(Math.random()*bX), (bX/2) + Math.floor(Math.random()*(bX/2)),
                           Math.floor(Math.random()*(bX/2))];
    // set up left and right bounds for sheep based on platform
    var leftLims = [0, 400, 0];
    var rightLims = [this.game.width - 50, this.game.width - 50, 360];
    this.leftLim = leftLims[this.g];
    this.rightLim = rightLims[this.g];
    // set position
    this.x = sheepWidths[this.g];
    this.y = this.game.world.height - sheepHeights[this.g];
    // get a random speed
    this.dx = Math.floor(Math.random()*3) + 1;
    // set physics and add to game
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
}

Sheep.prototype.update = function(){
    // land on platforms
    game.physics.arcade.collide(this, platforms);

    // travel back and forth on platforms
    if (((this.x + this.dx) <= this.leftLim) || ((this.x + this.dx) >= this.rightLim)){
        this.dx = this.dx*-1;
    }
    if (this.dx > 0 ){
        this.animations.play('right');
    }
    else{
        this.animations.play('left');
    }
    this.x = this.x + this.dx;
}