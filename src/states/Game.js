/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Enemy from '../sprites/Enemy'

import config from '../config'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.background.reload()
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.applyGravity = true
    this.game.physics.p2.gravity.y = 400

    this.game.physics.p2.updateBoundsCollisionGroup();
    this.enemyCG = this.game.physics.p2.createCollisionGroup();
    this.playerCG = this.game.physics.p2.createCollisionGroup();

    this.enemies = this.game.add.group()
    this.createPlayer()

    // setupWave will set the text
    this.enemyText = this.game.add.text(5, 0, "", {'font': '50px Bangers', fill: '#d93a27'} );
    this.enemyText.padding.set(30,0)
    this.enemyText.dirty = true
    
    this.wave = 1;
    this.setupWave( this.wave );
    
    this.waveText = this.game.make.text(this.game.world.centerX, this.game.world.centerY, "", {'font': '50px Cabin Sketch', fill: '#d93a27'} );
    this.waveText.anchor.setTo(0.5);
    this.waveText.padding.set(5,0)
    this.waveText.dirty = true
    this.waveText.alpha = 0.0;
    this.waveText.align = 'center';
    this.game.world.add( this.waveText );
    
    let healthBarOutline = this.add.graphics(this.world.width - 300,25)
    healthBarOutline.lineStyle(3,0x000000,0xFFFFFF)
    healthBarOutline.drawRoundedRect(0, 0, 250, 30,5)
    this.healthBar = this.add.graphics(healthBarOutline.x+1,healthBarOutline.y+1)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.pauseText = this.game.add.text(
      this.game.world.centerX, this.game.world.centerY-100,
      "PAUSED", {font: '42px Cabin Sketch', fill: '#820900'}
    )
    this.pauseText.anchor.setTo(0.5)
    this.pauseText.visible = false
    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.add(()=>{
      this.pause()
    })
  }

  pause() {
    if(this.game.paused) {
      this.game.paused = false
      this.pauseText.visible = false
    } else {
      this.game.paused = true
      this.pauseText.visible = true
    }
  }

  update() {
    this.player.body.setZeroVelocity()

    // Press left when the enemy is close, and you get a hit!
    if (this.cursors.left.isDown) {
      this.player.strikeLeft()
    } else if (this.cursors.right.isDown) {
      this.player.strikeRight()
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
    this.enemyText.setText(left)
    // wait a second, then start a new wave
    if(left === 0) {
      this.waveCompleted();
      //this.state.start('Splash',true,false,'won')
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
      enemies: this.enemies,
    })
    this.player.events.onKilled.add(() => {
      this.killedPlayer()
    })
    this.player.setCollisionGroup(this.playerCG)
    this.game.add.existing(this.player)
  }

  updateHealthBar() {
    this.healthBar.clear()
    let width = Math.round((this.player.health / this.player.maxHealth) * 250)
    this.healthBar.beginFill(0xd93a27)
    this.healthBar.drawRoundedRect(0,0,width-2,28,5)
  }
  
  setupWave( waveNumber ){
    this.enemiesLeft = waveNumber * config.waveSize;
    this.spawnEnemy = true;
    this.enemyText.setText( this.enemiesLeft );
  }
  
  waveCompleted(){
    let counter = 5;
    
    this.waveText.setText( this.waveTextContent( this.wave, counter ) );
    this.waveText.alpha = 0.0;
    this.waveText.revive();
    
    this.game.add.tween( this.waveText ).to( { alpha: 1 }, 2000, "Linear", true);
    
    
    let countdownEvent = this.time.events.loop(1000,() => {
      counter--;
      this.waveText.setText( this.waveTextContent( this.wave, counter ) );
      if( counter === 0 ){
        this.time.events.remove(countdownEvent)
        this.wave++;
        this.setupWave( this.wave );
        this.waveText.kill();
      }
    });
  }
  
  waveTextContent( waveNum, timeTillNext ){
    return `Wave ${waveNum} Complete!
    Press Space To Pause
    Next Wave In ${timeTillNext}`;
  }
}
