/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.load.physics('stick','assets/physics/stick.json');
  }

  create () {
    let ground = this.add.graphics(0,0)
    ground.beginFill(0x4e8f35)
    ground.drawRect(0,this.world.height - 100,this.world.width,100)
    this.add.image(10,10,'arrowKeys')

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height - 150
    })
    this.enemy = new Player({
      game: this.game,
      x: this.world.centerX + 300,
      y: this.world.height - 150
    })
    this.game.add.existing(this.player)
    this.game.add.existing(this.enemy)
    this.player.body.collides([this.enemy])
    this.enemy.body.collides([this.player])
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // make the sprite steady when it moves
    this.enemy.body.setZeroDamping();
	  this.enemy.body.fixedRotation = true;
  }

  update() {
    this.player.body.setZeroVelocity()
    
    //move enemy
    let closeToPlayerRight = this.player.x + this.player.width;
    if( this.enemy.x > closeToPlayerRight ){
      this.enemy.body.moveLeft(100);
    }else{
      this.enemy.body.setZeroVelocity();
    }

    if (this.cursors.left.isDown)
    {
      this.player.body.moveLeft(130);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.body.moveRight(130);
    }

    if (this.cursors.up.isDown)
    {
      this.player.body.moveUp(130);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.body.moveDown(130);
    }
    
    // Press space when the enemy is close, and you get a hit!
    if (this.spaceKey.isDown)
    {
      if( this.enemy.x <= closeToPlayerRight ){
        this.enemy.kill();
      }
    }
  }

}
