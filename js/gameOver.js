var retryButton;


var gameOver = {


preload:function() {

    game.load.image('retrybutton','assets/buttons/retrybutton.png');
    

},


create:function() {

    retryButton = game.add.button(game.world.centerX - 95, 200, 'retrybutton', this.retryGame, this, 2, 1, 0);
    
    

    

},



retryGame:function() {
    
    game.state.start('mainMenu');

},


update:function(){

},

}

