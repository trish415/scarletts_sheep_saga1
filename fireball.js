Fireball.prototype = Object.create(Phaser.Sprite.prototype);
Fireball.prototype.constructor = Fireball;


function Fireball(game, x, y, d){
    Phaser.Sprite.call(this, game, x, y, 'fire');
    this.animations.add('right', [0,1,2,3], 10, true);
    this.animations.add('left', [4,5,6,7], 10, true);
    this.x = x;
    this.y = y;
    this.dx = d;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
}

Fireball.prototype.update = function(){
    //choose direction of animation
    if (this.dx == -1){
        this.animations.play('left');
    }
    else{
        this.animations.play('right');
    }
    this.x = this.x + 7*this.dx;

}