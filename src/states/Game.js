/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Enemy from '../sprites/Enemy'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    let ground = this.add.graphics(0,0)
    ground.beginFill(0x4e8f35)
    ground.drawRect(0,this.world.height - 100,this.world.width,100)

    this.game.physics.p2.applyGravity = true
    this.game.physics.p2.gravity.y = 400

    this.game.physics.p2.updateBoundsCollisionGroup();
    this.enemyCG = this.game.physics.p2.createCollisionGroup();
    this.playerCG = this.game.physics.p2.createCollisionGroup();

    this.spawnEnemy = true
    this.enemiesLeft = 20
    this.enemies = this.game.add.group()
    this.createPlayer()

    this.cursors = this.input.keyboard.createCursorKeys()
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update() {
    this.player.body.setZeroVelocity()

    // Press left when the enemy is close, and you get a hit!
    if (this.cursors.left.isDown) {
      for(let enemy of this.enemies.children) {
        if(this.player.canHitLeft(enemy)) {
          enemy.hitLeft();
        }
      }
    } else if (this.cursors.right.isDown) {
      for(let enemy of this.enemies.children) {
        if (this.player.canHitRight(enemy)) {
          enemy.hitRight();
        }
      }
    }

    if(this.spawnEnemy) {
      this.spawnEnemy = false
      this.createEnemy(this.game.rnd.pick(['left','right']))
      this.enemiesLeft -= 1
      if(this.enemiesLeft > 0) {
        let nextSpawn = this.game.rnd.realInRange(0.2,2.0)
        this.time.events.add(1000 * nextSpawn, () => {
          this.spawnEnemy = true
        })
      }
    }
  }

  killedEnemy(enemy) {
    this.enemies.removeChild(enemy)
    if(this.enemies.length === 0 && this.enemiesLeft === 0) {
      this.state.start('Splash',true,false,true)
    }
  }

  createEnemy(side) {
    let x = 500
    if(side === 'left') x = -x;
    let enemy = new Enemy({
      game: this.game,
      x: this.world.centerX + x,
      player: this.player,
    })
    enemy.setCollisionGroup(this.enemyCG)
    enemy.collides([this.playerCG])
    enemy.events.onKilled.add(() => {
       this.killedEnemy(enemy)
    })
    this.game.add.existing(enemy)
    this.enemies.add(enemy)
    this.enemies.sort('y',Phaser.Group.SORT_ASCENDING)
  }

  createPlayer() {
    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
    })
    this.player.setCollisionGroup(this.playerCG)
    this.player.collides([this.enemyCG])
    this.game.add.existing(this.player)
  }
}
