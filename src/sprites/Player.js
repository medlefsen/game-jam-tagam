import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({game, x, y}) {
    super(game,x,y,'stick','stick.0000.png')
    this.animations.add('wave', Phaser.Animation.generateFrameNames('stick.', 0, 11, '.png', 4), 30, true, false);
    this.animations.play('wave');
    this.game.physics.p2.enable([this], false);
    this.updatePhysics()
  }

  update() {
    this.updatePhysics()
  }

  updatePhysics() {
    this.body.clearShapes()
    this.body.loadPolygon('stick', this.animations.currentFrame.name)
  }
}
