var SSSP1 = SSSP1 || {};

SSSP1.Game = function(){};
SSSP1.Game.prototype = {
    preload: function() {

    },
    create: function() {
        // add tilemap
        this.map = this.game.add.tilemap('testlevel');
        this.map.addTilesetImage('tiles_spritesheet','baseTiles');
        this.map.addTilesetImage('background_tiles', 'backTiles');
        //set layers
        this.backgroundLayer = this.map.createLayer('Background');
        this.platformLayer = this.map.createLayer('Platforms');
        this.platformEdges = this.map.createLayer('PlatformEdges');
        //set layer collisions
        this.map.setCollisionBetween(1, 100000, true, this.platformLayer);
        this.map.setCollisionBetween(1, 100000, true, this.platformEdges);
        //set game dimensions
        this.backgroundLayer.resizeWorld();
        this.scarlett = this.add.sprite(100,300, 'player');
    },
    update: function() {

    }

};