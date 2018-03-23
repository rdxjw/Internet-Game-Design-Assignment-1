Game.level1=function(game){};



Game.level1={
	create:function(){

game.physics.startSystem(Phaser.Physics.ARCADE);
     map = game.add.tilemap('level1',32,32);
     map.addTileSetImage('tileset');
     layer = map.createLayer(0);
     layer.resizeWorld();
 },



 update:function(){


 	player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
       
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
       
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        player.animations.stop();

        player.frame = 4;
    }

   
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    }

 },

}