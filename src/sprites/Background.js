import Phaser from 'phaser'
import Cloud from './Cloud'

export default class extends Phaser.Image {
  constructor(game) {
    super(game,0,0,'background')
    this.createRandomInitialClouds()
    this.reload()
  }

  reload() {
    for(let cloud of this.children) {
      cloud.start()
    }
    this.game.time.events.loop(5000,()=> {
      let createCloud = this.game.rnd.between(1, 20)
      if (createCloud === 1) {
        this.createRandomCloud().start()
      }
    })
  }

  createRandomCloud(x) {
    let y = this.game.rnd.between(0,150)
    let speed = this.game.rnd.realInRange(0.7,1.3)
    let type = this.game.rnd.pick([1,2,3])
    let cloud = new Cloud({
      game: this.game, type: type,
      x: x, y: y, speed: speed,
    })
    this.addChild(cloud)
    return cloud;
  }

  createRandomInitialClouds() {
    let createNum = this.game.rnd.between(2,5)
    for(let i = 0; i < createNum; ++i) {
      let x = this.game.rnd.between(0,this.game.world.width)
      this.createRandomCloud(x)
    }
  }
}
