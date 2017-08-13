import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init (state) {
    this.gameState = state
  }

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
    this.loadCharacter('player')
    this.loadCharacter('enemy')
  }

  create () {
    this.add.image(0,0,'background')
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    let title = this.addText("Mulligan Madness!", '42px Cabin Sketch', '#4B0082')
    let action = "Start"
    if(this.gameState === 'won') {
      this.addTextAbove(title,"You Won!", '26px Cabin Sketch', '#820900')
      action = 'Start Again'
    } else if(this.gameState === 'lost') {
      this.addTextAbove(title,"You Lost!", '26px Cabin Sketch', '#820900')
      action = 'Start Again'
    }

    let start = this.addTextBelow(title,"Press Space to "+action, '24px Cabin Sketch', '#4B0082')
    this.addTextBelow(start,"Attack with left and right arrows", '24px Cabin Sketch', '#4B0082')
  }

  addTextBelow(pos,content,font,color) {
    let text = this.addText(content,font,color)
    text.alignTo(pos, Phaser.BOTTOM_CENTER)
    return text;
  }

  addTextAbove(pos,content,font,color) {
    let text = this.addText(content,font,color)
    text.alignTo(pos, Phaser.TOP_CENTER)
    return text;
  }

  addText(content,font,color) {
    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, content, {'font': font, fill: color} );
    text.padding.set(20,0)
    text.dirty = true
    centerGameObjects([text])
    return text;
  }

  update () {
    if (this.spaceKey.isDown){
      this.state.start('Game');
    }
  }

  loadCharacter(name) {
    this.loadSprite(name)
    this.loadPhysics(name)
  }

  loadSprite(name) {
    this.load.atlasJSONHash(name, 'assets/animation/'+name+'.png', 'assets/animation/'+name+'.json')
  }

  loadPhysics(name) {
    this.game.load.physics(name,'assets/physics/'+name+'.json')
  }
}
