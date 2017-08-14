import Character from './Character'

export default class extends Character {
  constructor({game,x,player}) {
    super(game,x,'enemy','walk_right/0001.png')
    this.player = player
    this.checkWorldBounds = true
    this.body.collideWorldBounds = false
    this.fixedY += game.rnd.integerInRange(-20,20)
    this.speed = game.rnd.integerInRange(160,250)
  }

  walkRight() {
    this.state = 'walk_right'
    this.animations.play('walk_right',12,true)
  }

  walkLeft() {
    this.state = 'walk_left'
    this.animations.play('walk_left',12,true)
  }

  strikeRight() {
    this.state = 'strike_right'
    this.animations.play('strike_right',14,false)
  }

  strikeLeft() {
    this.state = 'strike_left'
    this.animations.play('strike_left',14,false)
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
    this.animations.paused = true
    this.body.fixedRotation = false
    this.fixedY = false
    this.outOfBoundsKill = true
    this.body.moveUp(500)
  }

  update() {
    super.update()
    if(this.state !== 'hit') {
      this.body.setZeroVelocity()
      this.determineAction()
    }
    if(this.state === 'walk_right') {
      this.body.moveRight(this.speed)
    } else if(this.state === 'walk_left') {
      this.body.moveLeft(this.speed)
    } else if(this.state.match(/strike/)) {
      let anim = this.animations.currentAnim
      if(anim.isFinished) {
        if(!anim.isReversed) {
          this.damagePlayer()
        }
        anim.reverse()
        anim.play()
      }
    }
  }

  determineAction() {
    if(!this.state || this.state.match(/walk/)) {
      if(this.canHitLeft(this.player)) {
        this.strikeLeft()
      } else if(this.canHitRight(this.player)) {
        this.strikeRight()
      } else if(this.x < this.player.x) {
        if(this.state !== 'walk_right') this.walkRight()
      } else {
        if(this.state !== 'walk_left') this.walkLeft()
      }
    }
  }

  damagePlayer() {
    this.player.damage(5)
  }
}
