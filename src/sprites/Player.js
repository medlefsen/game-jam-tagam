import Character from './Character'

export default class extends Character {
  constructor({game, x}) {
    super(game,x,'stick','wave/0000.png')
    this.animations.play('wave',30,true);
    this.body.static = true
  }
}
