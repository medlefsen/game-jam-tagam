import Character from './Character'

export default class extends Character {
  constructor({game, x, enemies}) {
    super(game,x,'player','stationary.png')
    this.enemies = enemies
    this.animations.play('wave',30,true);
    this.body.static = true
    this.maxHealth = this.health = 100
    this.state = 'stationary'
    this.range = 110
    let anim = this.animations.getAnimation('strike_right');
    
    // x2 for the reverse
    this.strikeTime = (anim.frameTotal / anim.speed) * 2;
  }

  strikeRight() {
    if(this.state === 'stationary') {
      this.state = 'strike_right'
      this.animations.play('strike_right', 30, false)
      this.playStrikeSound()
    }
  }

  strikeLeft() {
    if(this.state === 'stationary') {
      this.state = 'strike_left'
      this.animations.play('strike_left', 30, false)
      this.playStrikeSound()
    }
  }

  damageEnemies() {
    if(this.state === 'strike_left') {
      for(let enemy of this.enemies.children) {
        if (this.canHitLeft(enemy)) {
          enemy.hitLeft();
        }
      }
    } else {
      for(let enemy of this.enemies.children) {
        if (this.canHitRight(enemy)) {
          enemy.hitRight();
        }
      }
    }
  }

  update() {
    super.update()

    if(this.state.match(/strike/)) {
      let anim = this.animations.currentAnim
      if(anim.isFinished) {
        if(anim.isReversed) {
          this.state = 'stationary'
          anim.reverse()
        } else {
          this.damageEnemies()
          anim.reverse()
          anim.play()
        }
      }
    }
  }
}
