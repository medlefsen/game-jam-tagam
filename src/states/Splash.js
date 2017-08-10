import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    
    // remove progress bar when its done
    this.load.onLoadComplete.add( () => {
      this.loaderBar.kill();
      this.loaderBg.kill();
    });

    //
    // load your assets
    //
    this.loadSprite('stick')
    this.load.image('arrowKeys', './assets/images/arrow-keys.png')
  }

  create () {
    this.intro = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Mulligan Madness!", {'font': '42px Bangers', fill: '#4B0082'} );
    this.startText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Press Space to Start", {'font': '24px Bangers', fill: '#4B0082'} );
    centerGameObjects( [this.intro, this.startText] );
    this.startText.alignTo(this.intro, Phaser.BOTTOM_CENTER);
    
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
  
  update () {
    if (this.spaceKey.isDown){
      this.state.start('Game');
    }
  }

  loadSprite(name) {
    this.load.atlasJSONHash(name, 'assets/animation/'+name+'.png', 'assets/animation/'+name+'.json')
  }
}
