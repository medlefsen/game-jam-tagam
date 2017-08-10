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

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height - 220
    })
    this.game.add.existing(this.player)
  }

  render () {
  }
}
