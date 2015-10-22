var SSSP1 = SSSP1 || {};

SSSP1.Preload = function(){};

var s;
SSSP1.Preload.prototype = {
    preload: function(){
        //show nice background
        this.loadingScreen = this.add.sprite(0,0,'background');
        //load game assets
        this.load.tilemap('testlevel', 'art/levelminusoneI.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('baseTiles', 'art/base_tiles.png');
        this.load.image('backTiles', 'art/bg_grasslands.png');
        this.load.spritesheet('player', 'art/redmage_f.png', 32, 48);
        this.load.spritesheet('sheep','art/sheepys.png', 49, 40);
        this.load.spritesheet('dragon', 'art/DragonyDragon.png',145, 103);
        this.load.image('heartFull', 'art/heartFull.png');
        this.load.spritesheet('fire', 'art/fireball.png', 64, 48);
        this.load.audio('backMusic', 'art/music.mp3');

    },
    create:function(){
        this.loadingScreen.kill();
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.game.stage.backgroundColor = '#000';
        label = this.game.add.text(420, 150, "Scarlett's Sheep Saga\nPart 1", {font: '30px Arial', fill: '#fff', align: 'center'}); 
        label2 = this.game.add.text(420, 550, "Press Enter", {font: '20px Arial', fill: '#fff', align: 'center'});
        label3 = this.game.add.text(420, 320, "Protect the sheep through killing the dragons!Move using the cursor keys\nand shoot fireballs with the down key. If all the sheep are taken or you\nlose all your health, it's game over!", {font: '18px Arial', fill: '#fff'});
        label.anchor.setTo(0.5, 0.5);
        label2.anchor.setTo(0.5, 0.5);
        label3.anchor.setTo(0.5, 0.5);
        s = new Sheep(this.game, 0, 410);
    },
    update: function() {
        s.dx = 2;
        if (s.x > 750) {
            s.kill();
        }
        if (this.enter.isDown) {
            this.state.start('Game');
        }
    }
};
