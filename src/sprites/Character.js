import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor(game, x, name, initial) {
    let y = game.world.height - 200;
    super(game,x,y,name,initial)
    this.fixedY = y
    this.game.physics.p2.enable([this], false);
    this.body.fixedRotation = true
    this.addAnimations()
    this.range = 100
  }

  setCollisionGroup(cg) {
    this.cg = cg
  }

  collides(cgs) {
    this.cgs = cgs
  }

  playStrikeSound() {
    const clip = this.game.rnd.between(1,4)
    this.game.sound.play('clubWhoosh'+clip)
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
    if(this.fixedY) {
      this.body.y = this.fixedY
    }
  }

  updatePhysics() {
    this.body.clearShapes()
    this.body.loadPolygon(this.key, this.frameName)
    if(this.cg) this.body.setCollisionGroup(this.cg)
    if(this.cgs) this.body.collides(this.cgs)
  }

  canHitLeft(other) {
    return other.x < this.x && other.x > (this.x - this.range)
  }

  canHitRight(other) {
    return other.x > this.x && other.x < (this.x + this.range)
  }
}
