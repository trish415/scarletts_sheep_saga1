var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});


function preload() {
    //load art
    game.load.image('background', 'art/background.png');
}

var background;

function create(){
    //set background
    background = game.add.sprite(0,0,'background');
    background.scale.set(0.5,0.5);

}

function update() {

}