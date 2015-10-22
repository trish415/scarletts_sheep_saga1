var SSSP1 = SSSP1 || {};

SSSP1.Preload = function(){};

SSSP1.Preload.prototype = {
    preload: function(){
        //show nice background
        this.loadingScreen = this.add.sprite(0,0,'background');
        //load game assets
        this.load.tilemap('testlevel', 'art/levelminusoneI.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('baseTiles', 'art/base_tiles.png');
        this.load.image('backTiles', 'art/bg_grasslands.png');
        this.load.spritesheet('player', 'art/dude.png', 32, 48);
        this.load.spritesheet('sheep','art/sheepys.png', 49, 40);
        this.load.spritesheet('dragon', 'art/DragonyDragon.png',145, 103);
        this.load.image('heartFull', 'art/heartFull.png');
        this.load.spritesheet('fire', 'art/fireball.png', 64, 64);

    },
    create:function(){
        this.state.start('Game');
    }
};
