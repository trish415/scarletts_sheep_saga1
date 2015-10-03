var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.AUTO, "game", {preload:preload, update:update, create:create});


function preload() {
    //load art
    game.load.image('background', 'art/background.png');
    game.load.image('platform', 'art/platform.png');
}

var background;
var platforms;
var PLATFORM_HEIGHT = 32;

function create(){
    //set background
    background = game.add.sprite(0,0,'background');
    background.scale.set(0.5,0.5);
    //set up platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    var bottom = platforms.create(0, game.world.height - PLATFORM_HEIGHT, 'platform');
    var middle = platforms.create(0, game.world.height - 5*PLATFORM_HEIGHT, 'platform');
    var top = platforms.create(0, game.world.height - 9*PLATFORM_HEIGHT, 'platform');
    platforms.forEach(function(item){
        item.scale.setTo(2,1);
        item.body.immovable = true;
    })

}

function update() {

}