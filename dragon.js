Dragon.prototype = Object.create(Phaser.Sprite.prototype);
Dragon.prototype.constructor = Dragon;

Dragon.prototype.landingX = 0;
Dragon.prototype.speed = 3;
Dragon.prototype.hasSheep = false;
Dragon.prototype.hasLanded = false;
Dragon.prototype.dx = 1;
Dragon.prototype.dy = 1;
Dragon.prototype.hits = 0;
var numSheep = 10;

function Dragon(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'dragon');
    //dragon has a sheep variable for when it captures them, but kill the initial one
    this.sheepy = new Sheep(game, x, y);
    this.sheepy.kill();
    //set up count for hitting the bounds
    this.boundsCount = 0;
    this.animations.add('right', [0, 1, 2, 3], 10, true);
    this.animations.add('left', [4, 5, 6, 7], 10, true);
    //choose side to enter from
    var side = Math.floor(Math.random()*2);
    //set landing spot
    this.landingX = Math.floor(Math.random()*(this.game.width - 50));
    //set spawn point
    if (side == 0) {
        // left
        this.x = 0;
        this.dx = this.speed;
        this.frame = 0;
    }
    else {
        // right
        this.x = this.game.width - 100;
        this.dx = -1* this.speed;
        this.frame = 4;
    }
    //variable y starting position
    this.y = Math.floor(Math.random()*(this.game.height - 50));

    //set physics and add to game
    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);

}

Dragon.prototype.update = function(){

    // reverse direction at game bounds
    // use this to determine when to kill sheep
    if (((this.x + this.dx) >= (this.game.width - 150)) || ((this.x + this.dx) <= 0)){
        if (this.hasSheep == true){
            this.boundsCount = this.boundsCount + 1;
        }
        if (this.boundsCount == 4){
            if (this.sheepy.captured ==true){
                this.sheepy.kill();
                this.kill();
                numSheep -= 1;
                console.log('here');
                if (numSheep == 0){
                    //if there are no more sheep, game over
                    SSSP1.game.state.start("GameOver");
                }
            }
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