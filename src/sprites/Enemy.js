import Character from './Character'

export default class extends Character {
  constructor({game,x,y}) {
    super(game,x,y,'enemy','walk_right/0001.png')
    this.walk_right()
  }

  walk_right() {
    this.state = 'walk_right'
    this.animations.play('walk_right',8,true)
  }

  hitLeft() {
    this.hit()
    this.body.moveLeft(1200)
    this.body.rotateLeft(300)
  }

  hitRight() {
    this.hit()
    this.body.moveRight(1200)
    this.body.rotateRight(300)
  }

  hit() {
    this.state = 'hit'
    this.body.fixedRotation = false
    this.checkWorldBounds = true
    this.body.collideWorldBounds = false
    this.outOfBoundsKill = true
    this.body.moveUp(300)
  }

  update() {
    super.update()
    if(this.state == 'walk_right') {
      this.body.setZeroVelocity()
      this.body.moveRight(190)
    }
  }
}
