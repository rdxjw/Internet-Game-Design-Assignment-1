var player;
var platforms;
var map;
var layer1;
var layer2;
var layer3;
var layer4;
var objects;
var scoreLevel2 = 0;
var HiScoreLevel2 =  localStorage.getItem('HiScoreLevel2');
var enemiesKilled = 0;
var scoreText;
var hiScoreLevel2Text;
var arrow;
var slime4;
var slime5;
var slime6;
var slime7;
var slime8;
var slime9;
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
var lives = 1;
var deathcount = 0;
var left = false;
var right = false; 
var enemiesLeft = 6;
var arrowsLeft = 10;


var level2={

    preload:function(){



     game.load.spritesheet('playersprite', 'assets/player/playersprite.png',24,32);
     game.load.tilemap('secondlevel','assets/tilemaps/level2.json',null, Phaser.Tilemap.TILED_JSON);
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
     map = game.add.tilemap('secondlevel');
     map.addTilesetImage('oppcastle-mod-tiles', 'tileset');
     game.add.sprite(0, 0, 'nightbackground');
     
     
     layer2 = map.createLayer('background');
     layer1 = map.createLayer('layer1');
     
     layer1.resizeWorld();
     layer2.resizeWorld();
     
     
     map.setCollisionBetween(18,21,true,'layer1');
     map.setCollisionBetween(23,25,true,'layer1');
     map.setCollisionBetween(48,60,true,'layer1');
     

     map.setTileIndexCallback(49, this.playerDeath, this);
     map.setTileIndexCallback(50, this.playerDeath, this);
     map.setTileIndexCallback(51, this.playerDeath, this);
     map.setTileIndexCallback(52, this.playerDeath, this);
     map.setTileIndexCallback(53, this.playerDeath, this);
     map.setTileIndexCallback(54, this.playerDeath, this);
     map.setTileIndexCallback(55, this.playerDeath, this);
     map.setTileIndexCallback(56, this.playerDeath, this);

     

     
     
     
       
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
     scoreText = game.add.text(16, 16, 'Score: ' + scoreLevel2, { fontSize: '16px', fill: '#FFF' });
     hiScoreLevel2Text = game.add.text(16, 32, 'HiScore: ' + HiScoreLevel2, { fontSize: '16px', fill: '#FFF' });    
     livesText = game.add.text(16, 48, 'Lives: ' + lives, { fontSize: '16px', fill: '#FFF' });
     questText = game.add.text(200, 10, 'Quest! Kill 6 enemies to proceed. Enemies Left: ' + enemiesLeft, { fontSize: '20px', fill: '#FFF' }); 
     arrowsLeftText = game.add.text(16, 64, 'Arrows Available: ' + arrowsLeft, { fontSize: '16px', fill: '#FFF' });

     scoreText.fixedToCamera = true;
     hiScoreLevel2Text.fixedToCamera = true;
     livesText.fixedToCamera = true;
     questText.fixedToCamera = true;
     arrowsLeftText.fixedToCamera = true;  

     

     //create enemies and set collision
     slimes =  game.add.group();
     slimes.enableBody = true;
     slimes.physicsBodyType = Phaser.Physics.ARCADE;
     slimes.callAll('animations.add', 'animations', 'slimewalk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],12,true);
     slimes.callAll('play', null, 'slimewalk');
     
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
     game.physics.arcade.collide(slime4, layer1);
     game.physics.arcade.collide(slime5, layer1);
     game.physics.arcade.collide(slime6, layer1);
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
     if (arrowkeys.up.isDown && arrowsLeft > 0){

        this.fireArrowUp();

     } else if (arrowkeys.left.isDown && arrowsLeft > 0){

        this.fireArrowLeft();

     } else if (arrowkeys.right.isDown && arrowsLeft > 0){

        this.fireArrowRight();

     }


     if (player.body.velocity.x == 0) {

        player.animations.play('idle');
      
     } 

     if (controls.up.isDown && (player.body.onFloor() || player.body.touchingDown)) {

        player.body.velocity.y = -450;
        jumps=1;

     }

     if (scoreLevel2>HiScoreLevel2){

        HiScoreLevel2=scoreLevel2;
        hiScoreLevel2Text.text = 'HiScore: ' + scoreLevel2;
        window.localStorage.setItem( 'HiScoreLevel2', HiScoreLevel2 );

     }

     if(lives == 0 || arrowsLeft == 0){

        this.game.paused = true;
        gameOverText = game.add.text(200,308, 'GAME OVER (hit f5 to retry)', { fontSize: '32px', fill: '#FFF' });

     }
     if (enemiesLeft == 0){

        this.game.paused = true;
        winText = game.add.text(200,308, 'Congratulations you win! (hit f5 to retry)', { fontSize: '32px', fill: '#FFF' });

     }

     this.moveSlimeLevel2();
     this.chasePlayer();

     
     



     },


     moveSlimeLevel2:function(){


    if(Math.round(slime4.body.x) < 135 && slime4.body.onFloor()){

        slime4.body.velocity.x += 10;
        slime4.scale.setTo(-1,1);
     }
     if ( slime4.body.x >= 193){

         slime4.body.velocity.x -= 10;
         slime4.scale.setTo(1,1);
     }



     if(Math.round(slime5.body.x) < 195 && slime5.body.onFloor()){

        slime5.body.velocity.x += 30;
        slime5.scale.setTo(-1,1);
     }
     if ( slime5.body.x >= 263){

         slime5.body.velocity.x -= 30;
         slime5.scale.setTo(1,1);
     }



     if(Math.round(slime6.body.x) < 535 && slime6.body.onFloor()){

        slime6.body.velocity.x += 25;
        slime6.scale.setTo(-1,1);
     }
     if ( slime6.body.x >= 603){

         slime6.body.velocity.x -= 25;
         slime6.scale.setTo(1,1);
     }


      if(Math.round(slime7.body.x) < 45 && slime7.body.onFloor()){

        slime7.body.velocity.x += 15;
        slime7.scale.setTo(-1,1);
     }
     if ( slime7.body.x >= 93){

         slime7.body.velocity.x -= 15;
         slime7.scale.setTo(1,1);
     }


      if(Math.round(slime8.body.x) < 595  && slime8.body.onFloor()){

        slime8.body.velocity.x += 30;
        slime8.scale.setTo(-1,1);
     }
     if ( slime8.body.x >= 680){

         slime8.body.velocity.x -= 30;
         slime8.scale.setTo(1,1);
     }


      if(Math.round(slime9.body.x) < 893  && slime9.body.onFloor()){

        slime9.body.velocity.x += 30;
        slime9.scale.setTo(-1,1);
     }
     if ( slime9.body.x >= 960){

         slime9.body.velocity.x -= 30;
         slime9.scale.setTo(1,1);
     }


    },

    killArrow:function(){
        arrow.kill();
    },


    chasePlayer:function(){

        
        if((game.physics.arcade.distanceBetween(player, slime4.body.x)) < 130){


           game.physics.arcade.moveToObject(slime4,player,60,600);


        }
        if((game.physics.arcade.distanceBetween(player, slime5)) < 130){


           game.physics.arcade.moveToObject(slime5,player,60,600);


        }
        if((game.physics.arcade.distanceBetween(player, slime6)) < 130){


           game.physics.arcade.moveToObject(slime6,player,60,600);


        }
         if((game.physics.arcade.distanceBetween(player, slime7)) < 130){


           game.physics.arcade.moveToObject(slime7,player,60,600);


        }
         if((game.physics.arcade.distanceBetween(player, slime8)) < 130){


           game.physics.arcade.moveToObject(slime8,player,60,600);


        }   
         if((game.physics.arcade.distanceBetween(player, slime9)) < 130){


           game.physics.arcade.moveToObject(slime9,player,60,600);


        } 
     },




     playerDeath:function(player, layer1){

        scoreLevel2-=100;
        scoreText.text = 'Score: ' + scoreLevel2;
        player.reset(20,400);


     },


     createSlimes:function(){

         slime4 = slimes.create(140, 10, 'slime');
         slime4.anchor.setTo(0.5,0.5); 
         slime4.body.gravity.y = 1400;
         slime4.body.collideWorldBounds = true;


         slime5 = slimes.create(200, 200, 'slime');
         slime5.anchor.setTo(0.5,0.5); 
         slime5.body.gravity.y = 1400;
         slime5.body.collideWorldBounds = true;


         slime6 = slimes.create(540, 10, 'slime');
         slime6.anchor.setTo(0.5,0.5);
         slime6.body.gravity.y = 1400;
         slime6.body.collideWorldBounds = true;


         slime7 = slimes.create(50, 10, 'slime');
         slime7.anchor.setTo(0.5,0.5);
         slime7.body.gravity.y = 1400;
         slime7.body.collideWorldBounds = true;


         slime8 = slimes.create(600, 10, 'slime');
         slime8.anchor.setTo(0.5,0.5);
         slime8.body.gravity.y = 1400;
         slime8.body.collideWorldBounds = true;


         slime9 = slimes.create(900, 200, 'slime');
         slime9.anchor.setTo(0.5,0.5);
         slime9.body.gravity.y = 1400;
         slime9.body.collideWorldBounds = true;

         //var animate = game.add.tween(slimes).to({x:50}, 2000, 'Linear', true, 0, 1000, true );
        
     },


     nextLevel:function(){

        this.game.state.start("level2");
        

     },

     fireArrowUp:function(){

        if (game.time.now > arrowTime){
            arrow = arrows.getFirstExists(false);

            if(arrow){

                arrow.reset(player.x+7,player.y);
                arrow.body.velocity.y = -400;
                arrowTime = game.time.now + 200; 
                arrowsLeft-=1;  
                arrowsLeftText.text = 'Arrows Available: ' + arrowsLeft;   
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
                arrowsLeft-=1;  
                arrowsLeftText.text = 'Arrows Available: ' + arrowsLeft;     
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
                arrowsLeft-=1; 
                arrowsLeftText.text = 'Arrows Available: ' + arrowsLeft;    
               }
             }

         },


     collisionHandler:function(arrow, slime) {
     slime.kill();
     arrow.kill();
     enemiesKilled+=1;
     scoreLevel2 += 100;
     enemiesLeft -=1;
     scoreText.text = 'Score: ' + scoreLevel2;
     questText.text = 'Quest! Kill 6 enemies to proceed. Enemies Left: ' + enemiesLeft;
     },


     killPlayer:function(player, slime){
     player.kill();
     deathcount++;
     lives -=1;
     scoreLevel2-=50;
     scoreText.text = 'Score: ' + scoreLevel2;
     livesText.text = 'Lives: ' + lives;
     player.reset(20,400);

     },



     mobileJump:function(){

        if(player.body.onFloor()){

            player.body.velocity.y = -450;
            jumps=1;
        }


}
}


