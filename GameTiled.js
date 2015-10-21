var SSSP1 = SSSP1 || {};

SSSP1.Game = function(){};
SSSP1.Game.prototype = {
    preload: function() {

    },
    create: function() {
        // add tilemap
        this.map = this.game.add.tilemap('testlevel');
        this.map.addTilesetImage('base_tiles','baseTiles');
        this.map.addTilesetImage('bg_grasslands', 'backTiles');
        //set layers
        this.backgroundLayer = this.map.createLayer('Background');
        this.platformLayer = this.map.createLayer('Platforms');
        this.platformEdgeLayer = this.map.createLayer('PlatformEdges');
        //set layer collisions
        this.map.setCollisionBetween(1, 200, true, this.platformLayer);
        this.map.setCollisionBetween(1, 300, true, this.platformEdgeLayer);
        //set game dimensions
        this.backgroundLayer.resizeWorld();
        //add sprites
        this.sheepGroup = this.game.add.group();
        this.sheepGroup.enableBody = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this.game, 0, 0, this.cursors); 
        var result = this.findObjectsByType('sheep', this.map, 'SheepLayer');
        result.forEach(function(element){
            var s = new Sheep(this.game, element.x, element.y);
            s.body.bounce.y = 0.2;
            s.body.gravity.y = 150;
            s.body.collideWorldBounds = true;
            this.sheepGroup.add(s);
        }, this);
    },

    update: function() {
        this.game.physics.arcade.collide(this.player, this.platformLayer);
        this.game.physics.arcade.TILE_BIAS = 1000;
        this.game.physics.arcade.collide(this.sheepGroup, this.platformEdgeLayer, this.reverseDirection);
        this.game.physics.arcade.collide(this.sheepGroup, this.platformLayer);

    },
    findObjectsByType: function(type, map, layerName) {
        var result = new Array();
        map.objects[layerName].forEach(function(element){
            if (element.properties.type == type){
                element.y -= map.tileHeight/2;
                result.push(element);
            }
        });
        return result;
    },
    reverseDirection:function(s,p){
        s.dx = s.dx*-1;
    }


};
