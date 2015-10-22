var SSSP1 = SSSP1 || {};

SSSP1.Boot = function(){};

SSSP1.Boot.prototype = {
    preload: function(){
        //assets for loading screen
        this.load.image('background', 'art/CHICKENS.png');
    },
    create: function(){
        //set up preload screen
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // this.scale.setScreenSize(true);

        //add arcade physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //go to preload state
        this.state.start('Preload');
    }
};