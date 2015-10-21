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
        var result = this.findObjectsByType('sheep', this.map, 'SheepLayer');
        result.forEach(function(element){
            var s = new Sheep(this.game, element.x, element.y);
            s.body.bounce.y = 0.2;
            s.body.gravity.y = 150;
            s.body.collideWorldBounds = true;
            this.sheepGroup.add(s);
        }, this);

        this.dragonGroup = this.game.add.group();
        this.dragonGroup.enableBody = true;
        var d = new Dragon(this.game, 50, 50);
        d.body.collideWorldBounds = true;
        d.body.gravity.y = 150;
        this.dragonGroup.add(d);
        this.player = new Player(this.game, 0, 0, this.cursors); 
        this.heart1 = this.game.add.sprite(0, 0, 'heartFull');
        this.heart2 = this.game.add.sprite(60, 0, 'heartFull');
        this.heart3 = this.game.add.sprite(120, 0, 'heartFull');
        this.heart4 = this.game.add.sprite(180, 0, 'heartFull');
        this.heart5 = this.game.add.sprite(240, 0, 'heartFull');

    },

    update: function() {
        this.game.physics.arcade.collide(this.player, this.platformLayer);
        this.game.physics.arcade.collide(this.dragonGroup, this.platformLayer, this.dragonLanding);
        this.game.physics.arcade.TILE_BIAS = 1000;
        this.game.physics.arcade.collide(this.sheepGroup, this.platformEdgeLayer, this.reverseDirection);
        this.game.physics.arcade.collide(this.sheepGroup, this.platformLayer);
        this.game.physics.arcade.overlap(this.sheepGroup, this.dragonGroup, this.grabSheep);
        console.log(this.player.health);
        if (this.player.health <= 8) {
            this.heart5.kill();
        }
        if (this.player.health <= 6) {
            this.heart4.kill();
        }
        if (this.player.health <= 4) {
            this.heart3.kill();
        }
        if (this.player.health <= 2) {
            this.heart2.kill();
        }
        if (this.player.health <= 0) {
            this.heart1.kill();
        }



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
    },
    dragonLanding:function(d,p){
        console.log(d.hasLanded);
        if (d.hasLanded == false){
            console.log('firstland');
            d.hasLanded = true;
            d.dy = 0;
            var direction = Math.floor(Math.random()*2);
            if (direction == 0){
                d.dx = d.speed;
            }
            else{
                d.dx = -1*d.speed;
            }
        }
    },
    grabSheep:function(s,d){
        if (d.hasSheep == false){
            d.hasSheep = true;
            s.captured = true;
        }
        if(s.captured == true){
            s.x = d.x;
            s.y = d.y;
            s.animations.stop();
        }
    }


};
