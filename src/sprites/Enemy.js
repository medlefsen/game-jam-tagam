import Character from './Character'

export default class extends Character {
  constructor({game,x}) {
    super(game,x,'enemy','walk_right/0001.png')
    this.checkWorldBounds = true
    this.body.collideWorldBounds = false
  }

  walkRight() {
    this.state = 'walk_right'
    this.animations.play('walk_right',8,true)
  }

  walkLeft() {
    this.state = 'walk_left'
    this.animations.play('walk_left',8,true)
  }

  hitLeft() {
    this.hit()
    this.body.moveLeft(1500)
    this.body.rotateLeft(300)
  }

  hitRight() {
    this.hit()
    this.body.moveRight(1500)
    this.body.rotateRight(300)
  }

  hit() {
    this.state = 'hit'
    this.body.fixedRotation = false
    this.fixedY = false
    this.outOfBoundsKill = true
    this.body.moveUp(500)
  }

  update() {
    super.update()
    if(this.state == 'walk_right') {
      this.body.setZeroVelocity()
      this.body.moveRight(190)
    } else if(this.state == 'walk_left') {
      this.body.setZeroVelocity()
      this.body.moveLeft(190)
    }
  }
}
