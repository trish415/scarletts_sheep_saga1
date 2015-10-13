var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});
var player;
var platforms;

function preload() {
    //load art
    game.load.image('background', 'art/background.png');
    game.load.spritesheet('player', 'art/dude.png', 32, 48);
    game.load.image('platform', 'art/platform.png');
    game.load.spritesheet('sheep','art/sheepys.png', 49, 40);
}

var background;
var platforms;
var PLATFORM_HEIGHT = 32;
var sheep;
var numSheep = 10;
var cursors;

function create(){
    //setup
    initializeBackground();
    initializePlatforms();
    player = new Player(game, 100, 400); 

    game.physics.enable(Phaser.Physics.ARCADE);
    //add sheep randomly
    sheep = game.add.group();
    for (var i = 0; i < numSheep; i++){
        var s = new Sheep(game);
        s.body.bounce.y = 0.2;
        s.body.gravity.y = 150;
        s.body.collideWorldBounds = true;
    }
    //add controls
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

}

