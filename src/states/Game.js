/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

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
      x: this.world.centerX + 200,
      y: this.world.height - 150
    })
    this.game.add.existing(this.player)
    this.game.add.existing(this.enemy)
    this.player.body.collides([this.enemy])
    this.enemy.body.collides([this.player])
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    this.player.body.setZeroVelocity()

    if (this.cursors.left.isDown)
    {
      this.player.body.moveLeft(30);
    }
    else if (this.cursors.right.isDown)
    {
      this.player.body.moveRight(30);
    }

    if (this.cursors.up.isDown)
    {
      this.player.body.moveUp(30);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.body.moveDown(30);
    }
  }

}
