Sheep.prototype = Object.create(Phaser.Sprite.prototype);
Sheep.prototype.constructor = Sheep;

Sheep.prototype.dx = 0;
Sheep.prototype.captured = false;

function Sheep(game,x,y) {

    Phaser.Sprite.call(this, game, x, y, 'sheep');
    // setup animations
    this.frame = Math.floor(Math.random()*7);
    this.animations.add('left', [0,1,2,3], 10,true);
    this.animations.add('right', [4,5,6,7], 10, true);
    this.scale.setTo(1.25);
    // get a random speed
    this.dx = Math.floor(Math.random()*3) + 1;
    // set physics and add to game
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
}

Sheep.prototype.update = function(){

    // reverse direction at game bounds
    if (((this.x + this.dx) >= (this.game.width - 75)) || ((this.x + this.dx) <= 0)){
        this.dx = this.dx*-1;
    }
    // play animations
    if (this.dx > 0 ){
        this.animations.play('right');
    }
    else{
        this.animations.play('left');
    }
    this.x = this.x + this.dx;

}