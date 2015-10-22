Dragon.prototype = Object.create(Phaser.Sprite.prototype);
Dragon.prototype.constructor = Dragon;

Dragon.prototype.landingX = 0;
Dragon.prototype.speed = 3;
Dragon.prototype.hasSheep = false;
Dragon.prototype.hasLanded = false;
Dragon.prototype.dx = 1;
Dragon.prototype.dy = 1;
function Dragon(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'dragon');
    this.sheepy = new Sheep(game, x, y);
    this.sheepy.kill();
    this.boundsCount = 0;
    this.animations.add('right', [0, 1, 2, 3], 10, true);
    this.animations.add('left', [4, 5, 6, 7], 10, true);
    //choose side to enter from
    var side = Math.floor(Math.random()*2);
    //set landing spot
    this.landingX = Math.floor(Math.random()*(this.game.width - 50));
    if (side == 0) {
        // left
        this.x = 0;
        this.dx = this.speed;
        this.frame = 0;
    }
    else {
        // right
        this.x = this.game.width - 300;
        this.dx = -1* this.speed;
        this.frame = 4;
    }
    //for now fixed y starting position
    this.y = 50;

    //set physics and add to game
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);

}

Dragon.prototype.update = function(){

    // reverse direction at game bounds
    if (((this.x + this.dx) >= (this.game.width - 150)) || ((this.x + this.dx) <= 0)){
        if (this.hasSheep == true){
            this.boundsCount = this.boundsCount + 1;
        }
        if (this.boundsCount == 4){
            this.sheepy.kill();
            this.kill();
        }
        this.dx = this.dx*-1;
    }
    //travel to the landing position
    if ((this.x == this.landingX) && (this.hasLanded == false)){
        this.dx = 0;
    }
    if (this.hasLanded == false){
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
    if (this.hasLanded == true){
        this.x = this.x + this.dx;
    }


    if (this.dx > 0){
        this.animations.play('right');
    }
    else if (this.dx < 0){
        this.animations.play('left');
    }

}