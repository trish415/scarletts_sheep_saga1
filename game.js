var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});


function preload() {
    //load art
    game.load.image('background', 'art/background.png');
    game.load.image('platform', 'art/platform.png');
}

var PLATFORM_HEIGHT = 32;

function create(){
    //setup
    initializeBackground();
    initializePlatforms();

}

function update() {

}