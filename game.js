var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});
var player;

function preload() {
    //load art
    game.load.image('background', 'art/background.png');
    game.load.spritesheet('player', 'art/dude.png', 32, 48);
}

var background;

function create(){
    //set background
    background = game.add.sprite(0,0,'background');
    background.scale.set(0.5,0.5);
    player = new Player(game, 100, 400); 
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

}
