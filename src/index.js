import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './index.css';

const gameWidth = 1920;
const gameHeight = 1080;
const roadPosition = { gap: 140, min: 600, max: 880, x: 300 };

var timer;
var playTime = 5;

const gameStart = {
  key: 'gameStart',
  preload: function(){
    this.load.image('bg', 'src/assets/background/bg_old.jpg');
    this.load.svg('player', 'src/assets/player/player.svg', { width: 280 });
    this.load.image('logo', 'src/assets/logo.png');
    this.load.image('start', 'src/assets/start.png');
  },
  create: function() {
    this.bg = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'bg');
    this.player = this.add.image(roadPosition.x, roadPosition.min + roadPosition.gap, 'player');
    this.logo = this.add.image(1029+220, 270+180, 'logo');
    this.start = this.add.image(1029+220, 702+40, 'start').setInteractive();
    /* 行為控制 */
    this.start.on('pointerup', function () {
      this.scene.switch('playGame');
    }, this);
    this.time = this.add.text(700, 30, `TIME: ${playTime} sec`, { font: '82px Courier', fill: '#000' });
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
    },
    create: function(){
      this.sky = this.add.tileSprite(gameWidth / 2, 640 / 2, gameWidth, 640, 'sky');
      this.cloud = this.add.tileSprite(971 / 2, 394 / 2 + 283, 971, 394, 'cloud');
      this.city = this.add.tileSprite(gameWidth / 2, 430 / 2 + 215, gameWidth, 430, 'city');
      this.road = this.add.tileSprite(gameWidth / 2, 460 / 2 + 619, gameWidth, 460, 'road');
      this.player = this.add.image(roadPosition.x, roadPosition.min + roadPosition.gap, 'player').setInteractive();
      this.time = this.add.text(700, 30, `TIME: ${playTime} sec`, { font: '82px Courier', fill: '#000' });


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

      timer = setInterval(() => {
        if(playTime === 0) {
          this.scene.switch('gameEnd');
          clearInterval(timer);
        }
        playTime -= 1;
      }, 1000);

    },
    update: function(){
      this.sky.tilePositionX += 1;
      this.city.tilePositionX += 2;
      this.road.tilePositionX += 4;
      this.player.tilePositionX += 4;
      this.time.setText(`TIME: ${playTime} sec`);
    }
}

const gameEnd = {
  key: 'gameEnd',
  preload: function(){
    this.load.image('bg', 'src/assets/background/bg_rich.jpg');
    this.load.svg('endPlayer', 'src/assets/player/playerEnd.svg', { width: 290 });
    this.load.svg('coins', 'src/assets/gameEnd/coins.svg', { width: 600 });
    this.load.svg('lighting', 'src/assets/gameEnd/lighting.svg', { width: 290 });
    this.load.svg('ribbon', 'src/assets/gameEnd/ribbon.svg', { width: 600 });
    this.load.svg('warning', 'src/assets/gameEnd/warning.svg', { width: 600 });
    this.load.image('restart', 'src/assets/restart.png');
  },
  create: function() {
    this.bg = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'bg');
    this.endPlayer = this.add.image(450, roadPosition.min + roadPosition.gap, 'endPlayer');
    this.coins = this.add.image(960, 740, 'coins');
    this.ribbon = this.add.image(960, 600, 'ribbon');
    this.lighting1 = this.add.image(350, 800, 'lighting');
    this.lighting2 = this.add.image(550, 661, 'lighting');
    this.lighting3 = this.add.image(500, 893, 'lighting');
    this.warning = this.add.image(940, 300, 'warning');
    this.restart = this.add.image(960, 460, 'restart').setInteractive();
    /* 行為控制 */
    this.restart.on('pointerup', function () {
      this.scene.switch('gameStart');
    }, this);
  },
}

const config = {
  backgroundColor: '#fff',
  type: Phaser.AUTO,
  parent: "gameBlock",
  width: gameWidth,
  height: gameHeight,
  scene: [
    gameStart,
    playGame,
    gameEnd,
  ],
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
