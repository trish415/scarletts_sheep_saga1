function initializeBackground(){
    //set background
    background = game.add.sprite(0,0,'background');
    background.scale.set(0.5,0.5);
}

function initializePlatforms(){
    //set up platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    var bottom = platforms.create(0, game.world.height - PLATFORM_HEIGHT, 'platform');
    bottom.scale.setTo(2,1);
    var middleR = platforms.create(0.5*game.world.width, game.world.height - 5*PLATFORM_HEIGHT, 'platform');
    middleR.scale.setTo(1, 1);
    var top = platforms.create(0, game.world.height - 9*PLATFORM_HEIGHT, 'platform');
    platforms.forEach(function(item){
        item.body.immovable = true;
    })
}
