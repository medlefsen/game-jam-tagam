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

    this.enemyText = this.game.add.text(5, 0, this.enemiesLeft, {'font': '50px Bangers', fill: '#d93a27'} );
    this.enemyText.padding.set(30,0)
    this.enemyText.dirty = true
    let healthBarOutline = this.add.graphics(this.world.width - 300,25)
    healthBarOutline.lineStyle(3,0x000000,0xFFFFFF)
    healthBarOutline.drawRoundedRect(0, 0, 250, 30,5)
    this.healthBar = this.add.graphics(healthBarOutline.x+1,healthBarOutline.y+1)

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

    this.updateHealthBar()
  }

  killedEnemy(enemy) {
    this.enemies.removeChild(enemy)
    const left = this.enemies.length + this.enemiesLeft
    if(left === 0) {
      this.state.start('Splash',true,false,'won')
    } else {
      this.enemyText.setText(left)
    }
  }

  killedPlayer() {
    this.state.start('Splash',true,false,'lost')
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
    this.player.events.onKilled.add(() => {
      this.killedPlayer()
    })
    this.player.setCollisionGroup(this.playerCG)
    this.player.collides([this.enemyCG])
    this.game.add.existing(this.player)
  }

  updateHealthBar() {
    this.healthBar.clear()
    let width = Math.round((this.player.health / this.player.maxHealth) * 250)
    this.healthBar.beginFill(0xd93a27)
    this.healthBar.drawRoundedRect(0,0,width-2,28,5)
  }
}
