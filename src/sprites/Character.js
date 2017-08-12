import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game, x, y, name, initial) {
    super(game,x,y,name,initial)
    this.game.physics.p2.enable([this], false);
    // this.body.setZeroDamping()
    this.body.fixedRotation = true
    this.addAnimations()
    this.updatePhysics()
  }

  addAnimations() {
    let animations = new Map
    let frames = this.game.cache.getFrameData(this.key).getFrames()
    for(let i = 0; i < frames.length; ++i) {
      let frameName = frames[i].name
      let animationName = frameName.split('/')[0]
      if(animations.has(animationName)) {
        animations.get(animationName).push(frameName)
      } else {
        animations.set(animationName,[frameName])
      }
    }
    for(let [name,frames] of animations) {
      this.animations.add(name, frames.sort())
    }
  }

  update() {
    this.updatePhysics()
  }

  updatePhysics() {
    this.body.clearShapes()
    this.body.loadPolygon(this.key, this.frameName)
  }
}
