var SSSP1 = SSSP1 || {};

SSSP1.Game = function(){};

//globals for delay
var delay = 0;
var healthDelay = 0;
var justHit = false;
var justFired = false;

var dragonSpawned = true;
var dragonDelay = 0;
var dragonSpawnSpeed = 150;

var score = 0;

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
        //add music
        this.music = this.game.add.audio('backMusic');
        this.music.play();
        //add sheep
        this.sheepGroup = this.game.add.group();
        this.sheepGroup.enableBody = true;
        //cursors for player control
        this.cursors = this.input.keyboard.createCursorKeys();
        this.scoreText = this.game.add.text(675, 10, 'Points: 0', {font: '24px Arial', fill: '#FFFFFF'}); 
        //grab sheep from tiled map
        var result = this.findObjectsByType('sheep', this.map, 'SheepLayer');
        result.forEach(function(element){
            var s = new Sheep(this.game, element.x, element.y);
            s.body.bounce.y = 0.2;
            s.body.gravity.y = 150;
            s.body.collideWorldBounds = true;
            this.sheepGroup.add(s);
        }, this);

        //set up dragon group
        this.dragonGroup = this.game.add.group();
        this.dragonGroup.enableBody = true;

        //add player
        this.player = new Player(this.game, 0, 0, this.cursors); 
        this.player.scale.setTo(1.4);

        //set up fire group
        this.fireGroup = this.game.add.group();
        this.fireGroup.enableBody = true;

        //add hearts
        this.heart1 = this.game.add.sprite(10, 10, 'heartFull');
        this.heart2 = this.game.add.sprite(45, 10, 'heartFull');
        this.heart3 = this.game.add.sprite(80, 10, 'heartFull');
        this.heart4 = this.game.add.sprite(115, 10, 'heartFull');
        this.heart5 = this.game.add.sprite(150, 10, 'heartFull');
        this.heart1.scale.setTo(0.6);
        this.heart2.scale.setTo(0.6);
        this.heart3.scale.setTo(0.6);
        this.heart4.scale.setTo(0.6);
        this.heart5.scale.setTo(0.6);

    },

    update: function() {
        //set up all collisions
        this.game.physics.arcade.collide(this.player, this.platformLayer);
        this.game.physics.arcade.collide(this.dragonGroup, this.platformLayer, this.dragonLanding);
        this.game.physics.arcade.TILE_BIAS = 1000;
        this.game.physics.arcade.collide(this.sheepGroup, this.platformEdgeLayer, this.reverseDirection);
        this.game.physics.arcade.collide(this.sheepGroup, this.platformLayer);
        this.game.physics.arcade.overlap(this.sheepGroup, this.dragonGroup, this.grabSheep);
        this.game.physics.arcade.overlap(this.dragonGroup, this.fireGroup, this.hitDragon);
        this.game.physics.arcade.overlap(this.player, this.dragonGroup, this.hitPlayer);
        
        // update health display
        if (this.player.health <= 4) {
            this.heart5.kill();
        }
        if (this.player.health <= 3) {
            this.heart4.kill();
        }
        if (this.player.health <= 2) {
            this.heart3.kill();
        }
        if (this.player.health <= 1) {
            this.heart2.kill();
        }
        if (this.player.health <= 0) {
            this.heart1.kill();
            //if pleyer dies, game over
            SSSP1.game.state.start("GameOver");
        }

        //  delay for player taking hits from dragon
        if (justHit == true) {
            healthDelay += 1;

        }
        if (healthDelay >= 50){
            justHit = false;
            healthDelay = 0;
        }

        // delay for sending fireballs
        if (justFired == true) {
            delay = delay + 1;
        }
        if (delay >= 20){
            justFired = false;
            delay = 0;
        }
        if ((this.cursors.down.isDown) && (justFired == false)){
            // if able, send fireball
            justFired = true;
            var f = new Fireball(this.game, this.player.x, this.player.y, this.player.direction);
            f.body.gravity.y = 0;
            this.fireGroup.add(f);

        }

        // delay for dragon spawning
        if (dragonSpawned == true){
            dragonDelay += 1;
        }
        if (dragonDelay >= dragonSpawnSpeed){   
            //if time, spawn dragon
            var d = new Dragon(this.game, 50, 50);
            d.body.collideWorldBounds = true;
            d.body.gravity.y = 150;
            this.dragonGroup.add(d);
            dragonDelay = 0;
        }

        this.scoreText.setText('Points: '+score);
    },

    findObjectsByType: function(type, map, layerName) {
        // get objects from tiled
        var result = new Array();
        map.objects[layerName].forEach(function(element){
            if (element.properties.type == type){
                element.y -= map.tileHeight/2;
                result.push(element);
            }
        });
        return result;
    },

    //sheep reverse direction when collide with platform edges
    reverseDirection:function(s,p){
        s.dx = s.dx*-1;
    },

    //when dragon lands, left or right is chosen randomly
    dragonLanding:function(d,p){
        if (d.hasLanded == false){
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
    //when dragons collide with sheep, they pick them up
    grabSheep:function(s,d){
        if (d.hasSheep == false){
            d.hasSheep = true;
            s.captured = true;
            d.sheepy = s;
        }
        if(s.captured == true){
            s.x = d.x;
            s.y = d.y;
            s.animations.stop();
        }
    },

    // when dragon gets hit, decrease dragon hp and kill if applicable
    // also free the sheep
    hitDragon:function(d, f){
        f.kill();
        d.hits = d.hits + 1;
        if (d.hits == 3){
            d.sheepy.captured = false;
            d.kill();
            score += 10;
        }
    },
    // when dragon hits player, decrease player hp
    hitPlayer:function(p,d){
        if(justHit == false){
            justHit = true;
            p.health -=1;
        }

    }


};
