var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});


function preload() {
    //load art
    game.load.image('background', 'art/background.png');
    game.load.image('platform', 'art/platform.png');
    game.load.spritesheet('sheep','art/sheepys.png', 49, 40);
}

var background;
var platforms;
var PLATFORM_HEIGHT = 32;
var sheep;
var cursors;

function create(){
    //setup
    initializeBackground();
    initializePlatforms();
    game.physics.enable(Phaser.Physics.ARCADE);
    //add sheep
    sheep = new Sheep(game,32,game.world.height- 5*PLATFORM_HEIGHT, 'sheep');
    sheep.body.bounce.y = 0.2;
    sheep.body.gravity.y = 150;
    sheep.body.collideWorldBounds = true;
    //add controls
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.collide(sheep, platforms);
    //use cursors to test sheep animation
    sheep.body.velocity.x = 0;
    if(cursors.left.isDown)
    {
        sheep.body.velocity.x = -100;
        sheep.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        sheep.body.velocity.x = 100;
        sheep.animations.play('right');
    }
    else
    {
        sheep.animations.stop();
    }

    if(cursors.up.isDown)
    {
        sheep.body.velocity.y = -150;
    }
}

