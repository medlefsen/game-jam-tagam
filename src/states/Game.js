/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Enemy from '../sprites/Enemy'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    let ground = this.add.graphics(0,0)
    ground.beginFill(0x4e8f35)
    ground.drawRect(0,this.world.height - 100,this.world.width,100)

    this.game.physics.p2.updateBoundsCollisionGroup();
    let enemyCG = this.game.physics.p2.createCollisionGroup();
    let playerCG = this.game.physics.p2.createCollisionGroup();

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height - 150
    })
    this.player.body.setCollisionGroup(playerCG)
    this.enemy = new Enemy({
      game: this.game,
      x: this.world.centerX - 400,
      y: this.world.height - 150
    })
    this.enemy.body.setCollisionGroup(enemyCG)
    this.game.add.existing(this.player)
    this.game.add.existing(this.enemy)
    this.player.body.collides([enemyCG])
    this.enemy.body.collides([playerCG])
    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
    this.player.body.setZeroVelocity()

    // Press left when the enemy is close, and you get a hit!
    if (this.cursors.left.isDown) {
      if(this.player.canHitLeft(this.enemy)) {
        this.enemy.hitLeft();
      }
    } else if (this.cursors.right.isDown) {
      if(this.player.canHitRight(this.enemy)) {
        this.enemy.hitRight();
      }
    }
  }

}
