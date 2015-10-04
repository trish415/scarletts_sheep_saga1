Sheep.prototype = Object.create(Phaser.Sprite.prototype);
Sheep.prototype.constructor = Sheep;


function Sheep(game, x,y) {
    Phaser.Sprite.call(this, game, x, y, 'sheep');
    this.frame = 10;   
    this.animations.add('left', [0,1,2,3], 10,true);
    this.animations.add('right', [4,5,6,7], 10, true);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);
}