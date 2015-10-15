var SSSP1 = SSSP1 || {};
var boundsx = 840;
var boundsy = 700;

//create game and define states
SSSP1.game = new Phaser.Game(boundsx, boundsy, Phaser.AUTO, '');
SSSP1.game.state.add('Boot', SSSP1.Boot);
SSSP1.game.state.add('Preload', SSSP1.Preload);
SSSP1.game.state.add('Game', SSSP1.Game);

//start with the boot state
SSSP1.game.state.start('Boot');