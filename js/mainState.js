var player;
var platforms;
var map;
var layer1;
var layer2;
var layer3;
var layer4;
var objects;
var score = 0;
var HiScore = localStorage.getItem('HiScore');
var enemiesKilled = 0;
var scoreText;
var hiScoreText;
var arrow;
var slime;
var slime2;
var slime3;
var slime10;
var slimes;
var enemies;
var hitKey;
var arrowTime = 0;
var fireArrow;
var buttonRight;
var buttonLeft;
var buttonJump;
var buttonShootLeft;
var buttonShootRight;
var buttonShootUp;
var level1lives = 1;
var deathcount = 0;
var left = false;
var right = false; 
var gameOverText;
var winText;


var mainState={

    preload:function(){



     game.load.spritesheet('playersprite', 'assets/player/playersprite.png',24,32);
     game.load.tilemap('firstlevel','assets/tilemaps/level1version3.json',null, Phaser.Tilemap.TILED_JSON);
     game.load.image('tileset','assets/tilemaps/oppcastle-mod-tiles.png');
     game.load.image('tilesetrpg','assets/tilemaps/Sheet.png');
     game.load.image('nightbackground', 'assets/background/nightbackground.png' );
     game.load.spritesheet('slime', 'assets/enemies/slime.png',16,16);
     game.load.image('arrow', 'assets/weapon/arrow.png');
     game.load.image('arrowup', 'assets/weapon/arrowup.png');
     game.load.image('arrowleft', 'assets/weapon/arrowleft.png');
     game.load.spritesheet('JumpButton', 'assets/buttons/JumpButton.png',32,32);
     game.load.spritesheet('ShootButton', 'assets/buttons/ShootButton.png',32,32);
     game.load.spritesheet('LeftArrow', 'assets/buttons/LeftArrow.png',32,32);
     game.load.spritesheet('RightArrow', 'assets/buttons/RightArrow.png',32,32);
     game.load.spritesheet('ShootUp', 'assets/buttons/ShootUp.png',32,32);
     game.load.spritesheet('ShootLeft', 'assets/buttons/ShootLeft.png',32,32);
     game.load.spritesheet('ShootRight', 'assets/buttons/ShootRight.png',32,32);
     game.load.audio('bgm', ['assets/music/bgm.ogg']);


    },


    


    create:function(){

    

     music = game.add.audio('bgm');
     music.play();
     music.volume = 0.2;
     
     //set up map and player
     game.physics.startSystem(Phaser.Physics.ARCADE);
     map = game.add.tilemap('firstlevel');
     map.addTilesetImage('oppcastle-mod-tiles', 'tileset');
     game.add.sprite(0, 0, 'nightbackground');
     
     layer3 = map.createLayer('bg2');
     layer2 = map.createLayer('background');
     layer1 = map.createLayer('layer1');
     
     layer1.resizeWorld();
     layer2.resizeWorld();
     layer3.resizeWorld();
     
     map.setCollisionBetween(18,21,true,'layer1');
     map.setCollisionBetween(23,25,true,'layer1');
     map.setCollisionBetween(48,59,true,'layer1');
     map.setCollisionBetween(130,130,true,'layer1');
      
       
     player = game.add.sprite(20,400, 'playersprite');
     player.anchor.setTo(0.5, 0.5);

     

     //player animations
     player.animations.add("idle",[0,1,2,3,4,5,6,7,8,9,10],12,true);
     player.animations.add("walk",[11,12,13,14,15,16,17,18,19,20,21,22,23],12,true);
     player.animations.add("attack"[39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56],12,false);
     player.animations.add("death"[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],12,false);

     

     //player physics and controls
     game.physics.arcade.enable(player);



     player.body.gravity.y = 1400;
     player.body.collideWorldBounds = true;

     game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON);
     arrowkeys = game.input.keyboard.createCursorKeys();

     controls = {
     right:game.input.keyboard.addKey(Phaser.Keyboard.D),
     left:game.input.keyboard.addKey(Phaser.Keyboard.A),
     up:game.input.keyboard.addKey(Phaser.Keyboard.W),
     attackx :  game.input.keyboard.addKey(Phaser.Keyboard.I),
     deathc : game.input.keyboard.addKey(Phaser.Keyboard.O),
     fire : game.input.keyboard.addKey(Phaser.Keyboard.P),
 	 };

 	 //mobile controls 
 	 var buttonRight = game.add.button(100, 536, 'RightArrow',  null, this,  0, 1, 0, 1);
 	 var buttonLeft = game.add.button(32, 536, 'LeftArrow',  null, this, 0, 1, 0, 1);
 	 var buttonJump = game.add.button(150, 536, 'JumpButton',  this.mobileJump, 2, 1, 0);
 	 var buttonShootRight = game.add.button(300, 536, 'ShootRight', this.fireArrowRight, this, 2, 1, 0);
 	 var buttonShootLeft = game.add.button(200, 536, 'ShootLeft', this.fireArrowLeft, this, 2, 1, 0);
 	 var buttonShootUp = game.add.button(250, 536, 'ShootUp', this.fireArrowUp, this, 2, 1, 0);

 	 buttonRight.fixedToCamera = true;
 	 buttonLeft.fixedToCamera = true;
 	 buttonJump.fixedToCamera = true;
 	 buttonShootLeft.fixedToCamera = true;
 	 buttonShootRight.fixedToCamera = true;
 	 buttonShootUp.fixedToCamera = true;

     

     //arrows set up
     arrows=game.add.group();
     arrows.enableBody = true;
     arrows.physicsBodyType = Phaser.Physics.ARCADE;
     arrows.createMultiple(30,'arrow');
     arrows.setAll('anchor.x',0.5);
     arrows.setAll('anchor.y',1);
     arrows.setAll('outOfBoundsKill', true);
     arrows.setAll('checkWorldBounds', true);


     //score set up 
     scoreText = game.add.text(16, 16, 'Score: ' + score, { fontSize: '16px', fill: '#FFF' });
     hiScoreText = game.add.text(16, 32, 'HiScore: ' + HiScore, { fontSize: '16px', fill: '#FFF' });    
     livesText = game.add.text(16, 48, 'Lives: ' + level1lives, { fontSize: '16px', fill: '#FFF' });  
     

     scoreText.fixedToCamera = true;
     hiScoreText.fixedToCamera = true;
     livesText.fixedToCamera = true;


     

     //create enemies and set collision
     slimes =  game.add.group();
     slimes.enableBody = true;
     slimes.physicsBodyType = Phaser.Physics.ARCADE;
     slimes.callAll('animations.add', 'animations', 'slimewalk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],12,true);
     slimes.callAll('play', 'slimewalk');
     
	 this.createSlimes();

     

	 //game.physics.arcade.enable(slime);
     //game.physics.arcade.enable(slime2);
     //game.physics.arcade.enable(slime3);



     //set a boolean value to allow touch controls to work 

     buttonRight.events.onInputDown.add(function () {

        right = true;         
     });

      buttonRight.events.onInputUp.add(function () {

        right = false;   
     });


     buttonLeft.events.onInputDown.add(function () {

       left = true;
     });

     buttonLeft.events.onInputUp.add(function () {

       left = false;
     });

    


     },



    




    update:function(){

     game.physics.arcade.collide(player, layer1);
     game.physics.arcade.collide(player, layer2);
     game.physics.arcade.collide(player, layer3);
     game.physics.arcade.collide(player, layer4);
     game.physics.arcade.collide(slime, layer1);
     game.physics.arcade.collide(slime2, layer1);
     game.physics.arcade.collide(slime3, layer1);
     game.physics.arcade.collide(slimes, layer1);
     game.physics.arcade.collide(arrows, slimes, this.collisionHandler, 0, this);
     game.physics.arcade.overlap(player, slimes, this.killPlayer, 0, this);





     player.body.velocity.x = 0;
    
     //player movement controls

     
     if (controls.left.isDown){
       
        player.body.velocity.x -= 100;
        player.animations.play('walk');
        player.scale.setTo(-1,1);

      

     }
     
     if (controls.right.isDown){
       
        player.body.velocity.x += 100;
        player.animations.play('walk');
        player.scale.setTo(1,1);

     }

     if (controls.attackx.isDown){

    	player.animations.play('attack');


     }

     if (controls.deathc.isDown){

        player.animations.play('death');
     
     }

     //mobile controls 

     if(left){

        player.body.velocity.x -= 100;
        
        player.scale.setTo(-1,1);
        player.animations.play('walk');

     }

     if(right){

        player.body.velocity.x += 100;
        
        player.scale.setTo(1,1);
        player.animations.play('walk');

     }


     //Arrow firing controls that stop the player from firing in more than one direction at one time
     if (arrowkeys.up.isDown){

     	this.fireArrowUp();

     } else if (arrowkeys.left.isDown){

     	this.fireArrowLeft();

     } else if (arrowkeys.right.isDown){

     	this.fireArrowRight();

     }


     if (player.body.velocity.x == 0) {

        player.animations.play('idle');
      
     } 

     if (controls.up.isDown && (player.body.onFloor() || player.body.touchingDown)) {

        player.body.velocity.y = -450;
        jumps=1;

     }

     if (score>HiScore){

    	HiScore=score;
    	hiScoreText.text = 'HiScore: ' + score;
    	window.localStorage.setItem( 'HiScore', HiScore );

     }


     if(level1lives == 0){

        this.game.paused = true;

        gameOverText = game.add.text(300,308, 'GAME OVER (hit f5 to retry)', { fontSize: '32px', fill: '#FFF' });

     }  else if (enemiesKilled == 4){

        this.game.paused = true;
        winText = game.add.text(300,308, 'Congratulations you win! (hit f5 to retry)', { fontSize: '32px', fill: '#FFF' });

     }

     this.moveSlime();
     this.chasePlayer();
     
     


     },



     
     //Movement for slimes AI
     moveSlime:function(){


    if(Math.round(slime.body.x) < 155  && slime.body.onFloor()){

        slime.body.velocity.x += 30;
        slime.scale.setTo(-1,1);
     }
     if ( slime.body.x >= 250){

         slime.body.velocity.x -= 30;
         slime.scale.setTo(1,1);
     }



     if(Math.round(slime2.body.x) < 193 && slime2.body.onFloor()){

        slime2.body.velocity.x += 30;
        slime2.scale.setTo(-1,1);
     }
     if ( slime2.body.x >= 265){

         slime2.body.velocity.x -= 30;
         slime2.scale.setTo(1,1);
     }



     if(Math.round(slime3.body.x) < 595 && slime3.body.onFloor()){

        slime3.body.velocity.x += 30;
        slime3.scale.setTo(-1,1);
     }
     if ( slime3.body.x >= 655){

         slime3.body.velocity.x -= 30;
         slime3.scale.setTo(1,1);
     }

     if(Math.round(slime10.body.x) < 445  && slime10.body.onFloor()){

        slime10.body.velocity.x += 30;
        slime10.scale.setTo(-1,1);
     }
     if ( slime10.body.x >= 605){

         slime10.body.velocity.x -= 30;
         slime10.scale.setTo(1,1);
     }


     },

     // extended AI to follow player using arcade physics
      chasePlayer:function(){

        
        if((game.physics.arcade.distanceBetween(player, slime)) < 130){


           game.physics.arcade.moveToObject(slime,player,60,600);


        }
        if((game.physics.arcade.distanceBetween(player, slime2)) < 130){


           game.physics.arcade.moveToObject(slime2,player,60,600);


        }
        if((game.physics.arcade.distanceBetween(player, slime3)) < 130){


           game.physics.arcade.moveToObject(slime3,player,60,600);

       }
       if((game.physics.arcade.distanceBetween(player, slime10)) < 130){


           game.physics.arcade.moveToObject(slime10,player,60,600);

       }
        
     },



     playerDeath:function(player, layer1){

     	score-=100;
     	scoreText.text = 'Score: ' + score;
        player.reset(20,400);


     },

     // Function to create the slimes called in the create function
     createSlimes:function(){

         slime = slimes.create(160, 300, 'slime');
         slime.anchor.setTo(0.5,0.5);
         slime.body.gravity.y = 1400;
         slime.body.collideWorldBounds = true;
         game.physics.arcade.enable(slime);

         slime2 = slimes.create(200, 200, 'slime');
         slime2.anchor.setTo(0.5,0.5);
         slime2.body.gravity.y = 1400;
         slime2.body.collideWorldBounds = true;
         game.physics.arcade.enable(slime2);

         slime3 = slimes.create(600, 300, 'slime');
         slime3.anchor.setTo(0.5,0.5);
         slime3.body.gravity.y = 1400;
         slime3.body.collideWorldBounds = true;
         game.physics.arcade.enable(slime3);

         slime10 = slimes.create(450, 200, 'slime');
         slime10.anchor.setTo(0.5,0.5);
         slime10.body.gravity.y = 1400;
         slime10.body.collideWorldBounds = true;
         game.physics.arcade.enable(slime10);

     	 
     },


     nextLevel:function(){

     	this.game.state.start("level2");
     	

     },


     // Functions to control the arrows 
     fireArrowUp:function(){                        //created with the help of youtube tutorial but modified to fit my needs

     	if (game.time.now > arrowTime){
     		arrow = arrows.getFirstExists(false);

     		if(arrow){

     			arrow.reset(player.x+7,player.y);
     			arrow.body.velocity.y = -400;
     			arrowTime = game.time.now + 200;	
     		   }
     	     }

         },

     fireArrowLeft:function(){

     	if (game.time.now > arrowTime){
     		arrow = arrows.getFirstExists(false);

     		if(arrow){

     			arrow.reset(player.x,player.y+10);
     			arrow.body.velocity.x = -400;
     			arrowTime = game.time.now + 200;	
     		   }
     	     }

         },


     fireArrowRight:function(){

     	if (game.time.now > arrowTime){
     		arrow = arrows.getFirstExists(false);

     		if(arrow){

     			arrow.reset(player.x,player.y+10);

     			arrow.body.velocity.x = +400;
     			arrowTime = game.time.now + 200;	
     		   }
     	     }

         },

     // collsion handler to deal with arrows/player colliding with slimes
     collisionHandler:function(arrow, slime) {
     slime.kill();
     arrow.kill();
     enemiesKilled+=1;
     score += 100;
     scoreText.text = 'Score: ' + score;
	 },


	 killPlayer:function(player, slime){
	 player.kill();
	 deathcount+=1;
	 level1lives-=1;
     score-=50;
	 scoreText.text = 'Score: ' + score;
     livesText.text = 'Lives: ' + level1lives;
     player.reset(20,400);

	 },

	 
     // functions that enable controls for the mobile buttons
     mobileMoveLeft:function(){

        player.body.velocity.x -= 150;
        player.animations.play('walk');
        player.scale.setTo(-1,1);

     },


     mobileMoveRight:function(){

        player.body.velocity.x += 150;
        player.animations.play('walk');
        player.scale.setTo(1,1);

     },


     mobileJump:function(){

        if(player.body.onFloor()){

            player.body.velocity.y = -450;
            jumps=1;
        }








}
}

