var SSSP1 = SSSP1 || {};

SSSP1.GameOver = function(){};

SSSP1.GameOver.prototype = {
    preload: function(){
        //show nice background
        this.game.stage.backgroundColor = '#000';
        label = this.game.add.text(225, 150, "GAME OVER", {font: '60px Arial', fill: '#fff', align: 'center'});
        label2 = this.game.add.text(300, 250, "Score: " + score, {font: '40px Arial', fill: '#fff', align: 'center'});
    }
}