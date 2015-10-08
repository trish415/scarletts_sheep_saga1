var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});
var player;

function preload() {
    //load art
    game.load.image('background', 'art/background.png');
    game.load.spritesheet('player', 'art/dude.png', 32, 48);
    game.load.image('platform', 'art/platform.png');
}

var PLATFORM_HEIGHT = 32;

function create(){
    //set background
    player = new Player(game, 100, 400); 
    cursors = game.input.keyboard.createCursorKeys();
    //setup
    initializeBackground();
    initializePlatforms();

}

function update() {

}
