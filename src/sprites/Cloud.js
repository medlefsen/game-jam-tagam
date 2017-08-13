import Phaser from 'phaser'

export default class extends Phaser.Image {
  constructor({game,x,y,type,speed}) {
    super(game,0,y,'cloud'+type)
    this.speed = speed
    this.type = type
    this.setX(x)
  }

  start() {
    this.tween = this.game.add.tween(this)
    let dest = this.game.world.width
    let time = (400 * (dest - this.x)) / this.speed
    this.tween.to({x: dest}, time)
    this.tween.onComplete.add(()=>{
      this.kill()
    })
    this.tween.start()
  }

  setX(x) {
    if(x == null) {
      this.x = -this.width
    } else {
      this.x = x
    }
  }
}
