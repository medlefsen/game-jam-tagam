import Phaser from 'phaser'
import WebFont from 'webfontloader'
import Background from '../sprites/Background'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#ffffff'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers', 'Cabin Sketch']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.loadAudio('club_whoosh',4)
    this.loadAudio('club_hit',5)
    this.loadAudio('caddie_groan',9)
    this.loadAudio('caddie_attack_hit',5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('background', './assets/images/background.png')
    this.load.image('cloud1', './assets/images/cloud1.png')
    this.load.image('cloud2', './assets/images/cloud2.png')
    this.load.image('cloud3', './assets/images/cloud3.png')
  }

  create() {
    this.game.background = new Background(this.game)
    this.stage.addChildAt(this.game.background,0)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

  loadAudio(name,num) {
    if(this.game.audioNumClips == null) {
      this.game.audioNumClips = {}
    }
    this.game.audioNumClips[name] = num
    for(let i = 1;i <= num; ++i) {
      this.load.audio(name+i,'./assets/audio/'+name+'_'+i+'.wav')
    }
  }
}
