import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './index.css';
import { gameWidth, gameHeight, roadPosition, playTime, speed, getRandomBlock, getRandomRoadIndex } from './utils';
import bg_old from './assets/background/bg_old.jpg';
import player from './assets/player/player.svg';
import coinIcon from './assets/coinIcon.svg';
import logo from './assets/logo.png';
import start from './assets/start.png';
import sky_old from './assets/background/sky_old.png';
import cloud_old from './assets/background/cloud_old.png';
import city from './assets/background/city.png';
import road from './assets/background/road.png';
import coin from './assets/coin.svg';
import stone from './assets/stone.svg';
import mosquito from './assets/mosquito.svg';
import flood from './assets/flood.svg';
import boom from './assets/boom.svg';
import bg_rich from './assets/background/bg_rich.jpg';
import playerEnd from './assets/player/playerEnd.svg';
import coins from './assets/gameEnd/coins.svg';
import lighting from './assets/gameEnd/lighting.svg';
import ribbon from './assets/gameEnd/ribbon.svg';
import warning from './assets/gameEnd/warning.svg';
import restart from './assets/restart.png';
import gameOverImg from './assets/gameOver.svg';

var coinCount = 0;

const gameStart = {
  key: 'gameStart',
  preload: function(){
    this.load.image('bg', 'src/assets/background/bg_old.jpg');
    this.load.svg('player', 'src/assets/player/player.svg', { width: 280 });
    this.load.svg('coinIcon', 'src/assets/coinIcon.svg', { width: 100 });
    this.load.image('logo', 'src/assets/logo.png');
    this.load.image('start', 'src/assets/start.png');
  },
  create: function() {
    this.bg = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'bg');
    this.player = this.add.image(roadPosition.x, roadPosition.min + roadPosition.gap, 'player');
    this.logo = this.add.image(1029+220, 270+180, 'logo');
    this.coinIcon = this.add.image(1700, 80, 'coinIcon');
    this.start = this.add.sprite(1029+220, 702+40, 'start').setInteractive();
    /* 行為控制 */
    this.start.on('pointerup', function () {
      this.scene.switch('playGame');
    }, this);
    this.playTime = this.add.text(700, 30, `TIME: ${playTime} s`, { font: '82px Courier', fill: '#000' });
    this.coinNum = this.add.text(1750, 45, 0, { font: '70px Courier', fill: '#000' });
  },
}

const playGame = {
    key: 'playGame',
    preload: function(){
      this.load.image('sky', 'src/assets/background/sky_old.png');
      this.load.image('cloud', 'src/assets/background/cloud_old.png');
      this.load.image('city', 'src/assets/background/city.png');
      this.load.image('road', 'src/assets/background/road.png');
      this.load.svg('player', 'src/assets/player/player.svg', { width: 280 });
      this.load.svg('coin', 'src/assets/coin.svg', { width: 280 });
      this.load.svg('stone', 'src/assets/stone.svg', { width: 280 });
      this.load.svg('mosquito', 'src/assets/mosquito.svg', { width: 280 });
      this.load.svg('flood', 'src/assets/flood.svg', { width: 280 });
      this.load.svg('boom', 'src/assets/boom.svg', { width: 130 });
      this.load.svg('coinIcon', 'src/assets/coinIcon.svg', { width: 100 });
    },
    create: function(){
      this.playTimer = playTime;
      this.blocks = [];
      this.sky = this.add.tileSprite(gameWidth / 2, 640 / 2, gameWidth, 640, 'sky');
      this.cloud = this.add.tileSprite(971 / 2, 394 / 2 + 283, 971, 394, 'cloud');
      this.city = this.add.tileSprite(gameWidth / 2, 430 / 2 + 215, gameWidth, 430, 'city');
      this.road = this.add.tileSprite(gameWidth / 2, 460 / 2 + 619, gameWidth, 460, 'road');
      this.playTime = this.add.text(700, 30, `TIME: ${playTime} sec`, { font: '82px Courier', fill: '#000' });
      this.coinIcon = this.add.image(1700, 80, 'coinIcon');
      this.coinNum = this.add.text(1750, 45, coinCount, { font: '70px Courier', fill: '#000' });

      this.timer = this.time.addEvent({
        delay: 1000,
        callback: () => {
          if(this.playTimer === 1) {
            this.scene.switch('gameEnd');
            return;
          }
          const blockType = getRandomBlock();
          let current, road = [0, 1, 2];

          for(let el of blockType) {
            [current, road] = getRandomRoadIndex(road);
            if(el === 1) {
              const coin = this.physics.add.sprite(1940, roadPosition.min + roadPosition.gap * (current + 1), 'coin');
              coin.setName('coin');
              this.blocks.push(coin);
              this.physics.add.collider(this.player, coin, (player, coin) => {
                coinCount += 1;
                coin.destroy();
              });
            }
            if(el === 2) {
              let block;
              if(this.playTimer < playTime * 1/3) {
                block = this.physics.add.sprite(1940, roadPosition.min + roadPosition.gap * (current + 1), 'flood');
                block.setSize(block.w, 80);
                block.setName('flood');
              }else if(this.playTimer < playTime * 2/3) {
                block = this.physics.add.sprite(1940, roadPosition.min + roadPosition.gap * (current + 1), 'mosquito');
                block.setSize(block.w, 80);
                block.setName('mosquito');
              }else {
                block = this.physics.add.sprite(1940, roadPosition.min + roadPosition.gap * (current + 1), 'stone');
                block.setName('stone');
              }
              this.blocks.push(block);
              this.physics.add.collider(this.player, block, (player, el2) => {
                this.boom = this.add.image(roadPosition.x + 50, this.player.y + 80, 'boom');
                this.boom.setDepth(51);
                this.scene.switch('gameOver');
                el2.destroy();
              });
            }
          }
          this.playTimer -= 1;
        },
        loop: true
      });


      this.player = this.physics.add.sprite(roadPosition.x, roadPosition.min + roadPosition.gap, 'player');
      this.player.setSize(205, 80);
      this.player.setOffset(0, this.player.height - 80);
      this.player.setDepth(50);

      /* 行為控制 */
      const upAct = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      const downAct = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      upAct.on('down', (event) => {
        if(this.player.y > roadPosition.min) {
          this.player.setPosition(roadPosition.x, this.player.y - roadPosition.gap);
        }
      });
      downAct.on('down', (event) => {
        if(this.player.y < roadPosition.max) {
          this.player.setPosition(roadPosition.x, this.player.y + roadPosition.gap);
        }
      });

    },
    update: function(){
      this.sky.tilePositionX += 1;
      this.city.tilePositionX += 2;
      this.road.tilePositionX += speed[1];
      this.playTime.setText(`TIME: ${this.playTimer} s`);
      this.coinNum.setText(coinCount);
      for(let block of this.blocks) {
        if(block.name === 'mosquito') {
          block.setPosition(block.x -= speed[2], block.y);
        }else if(block.name === 'flood') {
          block.setPosition(block.x -= speed[3], block.y);
        }else block.setPosition(block.x -= speed[1], block.y);
      }
    }
}

const gameEnd = {
  key: 'gameEnd',
  preload: function(){
    this.load.image('bg_rich', 'src/assets/background/bg_rich.jpg');
    this.load.svg('endPlayer', 'src/assets/player/playerEnd.svg', { width: 290 });
    this.load.svg('coins', 'src/assets/gameEnd/coins.svg', { width: 600 });
    this.load.svg('lighting', 'src/assets/gameEnd/lighting.svg', { width: 290 });
    this.load.svg('ribbon', 'src/assets/gameEnd/ribbon.svg', { width: 600 });
    this.load.svg('warning', 'src/assets/gameEnd/warning.svg', { width: 600 });
    this.load.image('restart', 'src/assets/restart.png');
    this.load.svg('coinIcon', 'src/assets/coinIcon.svg', { width: 100 });
  },
  create: function() {
    this.bg_rich = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'bg_rich');
    this.endPlayer = this.add.image(450, roadPosition.min + roadPosition.gap, 'endPlayer');
    this.coinIcon = this.add.image(1700, 80, 'coinIcon');
    this.coinNum = this.add.text(1750, 45, coinCount, { font: '70px Courier', fill: '#000' });
    this.coins = this.add.image(960, 740, 'coins');
    this.ribbon = this.add.image(960, 600, 'ribbon');
    this.lighting1 = this.add.image(350, 800, 'lighting');
    this.lighting2 = this.add.image(550, 661, 'lighting');
    this.lighting3 = this.add.image(500, 893, 'lighting');
    this.warning = this.add.image(940, 300, 'warning');
    this.restart = this.add.sprite(960, 460, 'restart').setInteractive();
    /* 行為控制 */
    this.restart.on('pointerup', function () {
      window.location.reload();
    }, this);
  },
}

const gameOver = {
  key: 'gameOver',
  preload: function(){
    this.load.image('bg', 'src/assets/background/bg_old.jpg');
    this.load.image('restart', 'src/assets/restart.png');
    this.load.svg('gameOver', 'src/assets/gameOver.svg', { width: 640 });
  },
  create: function() {
    this.bg = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'bg');
    this.restart = this.add.sprite(960, 660, 'restart').setInteractive();
    this.gameOver = this.add.image(960, 370, 'gameOver');
    this.bg.setTint(0x888888);

    /* 行為控制 */
    this.restart.on('pointerup', function () {
      window.location.reload();
    }, this);
  },
}

const config = {
  backgroundColor: '#fff',
  type: Phaser.AUTO,
  parent: "gameBlock",
  width: gameWidth,
  height: gameHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [
    gameStart,
    playGame,
    gameEnd,
    gameOver,
  ],
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
