var easymodebutton;
var hardmodebutton;


var mainMenu = {


preload:function() {

    game.load.image('mainmenu','assets/background/mainmenu.png');
    game.load.image('easymodebutton','assets/buttons/easymodebutton.png');
    game.load.image('hardmodebutton','assets/buttons/hardmodebutton.png');

},


create:function() {

    game.add.sprite(0,0,'mainmenu');
    easymodebutton = game.add.button(game.world.centerX-135, 200, 'easymodebutton', this.easyMode, this, 2, 1, 0);
    hardmodebutton = game.add.button(game.world.centerX-135, 400, 'hardmodebutton', this.hardMode, this, 2, 1, 0);
    

    

},



easyMode:function() {
    
    game.state.start('mainState');
},

hardMode:function() {
    
    game.state.start('level2');
},



update:function(){

},

}