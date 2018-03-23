var game;





window.onload = function(){

   if (screen.width>1500){
          game = new Phaser.Game(1024,608,Phaser.AUTO,"ph_game");
         

   } else {
   		
   	     game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'ph_game');
		 //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		 
   }
 game.state.add("gameOver",gameOver);
 game.state.add("mainMenu", mainMenu);
 game.state.add("mainState", mainState);
 //game.state.add("level1",level1);
 game.state.add("level2",level2);
 game.state.start('mainMenu');
 
   
}


 