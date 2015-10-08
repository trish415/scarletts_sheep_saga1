function initializeBackground(){
    //set background
    var background = game.add.sprite(0,0,'background');
    background.scale.set(0.5,0.5);
}

function initializePlatforms(){
    //set up platforms
    var platforms = game.add.group();
    platforms.enableBody = true;
    var bottom = platforms.create(0, game.world.height - PLATFORM_HEIGHT, 'platform');
    var middle = platforms.create(0, game.world.height - 5*PLATFORM_HEIGHT, 'platform');
    var top = platforms.create(0, game.world.height - 9*PLATFORM_HEIGHT, 'platform');
    platforms.forEach(function(item){
        item.scale.setTo(2,1);
        item.body.immovable = true;
    })
}