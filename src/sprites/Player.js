import Character from './Character'

export default class extends Character {
  constructor({game, x, y}) {
    super(game,x,y,'stick','wave/0000.png')
    this.animations.play('wave',30,true);
    this.body.static = true
  }
}
