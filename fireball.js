Fireball.prototype = Object.create(Phaser.Sprite.prototype);
Fireball.prototype.constructor = Fireball;


function Fireball(game, x, y, d){
    Phaser.Sprite.call(this, game, x, y, 'fire');
    this.animations.add('go', [0,1,2,3], 10, true);
    this.x = x;
    this.y = y;
    this.dx = d;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
}

Fireball.prototype.update = function(){
    this.animations.play('go');
    this.x = this.x + 7*this.dx;

}