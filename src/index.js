import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './index.css';

const gameWidth = 1920;
const gameHeight = 1080;
const roadPosition = { gap: 140, min: 600, max: 880 };

const gameStart = {
    key: 'gameStart',
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
      this.player = this.add.image(300, roadPosition.min + roadPosition.gap, 'player').setInteractive();

      const upAct = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      const downAct = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      upAct.on('down', (event) => {
        if(this.player.y > roadPosition.min) {
          this.player.setPosition(300, this.player.y - roadPosition.gap);
        }
      });
      downAct.on('down', (event) => {
        if(this.player.y < roadPosition.max) {
          this.player.setPosition(300, this.player.y + roadPosition.gap);
        }
      });
    },
    update: function(){
      this.sky.tilePositionX += 1;
      this.city.tilePositionX += 2;
      this.road.tilePositionX += 4;
      this.player.tilePositionX += 4;
    }
}

const config = {
  backgroundColor: '#fff',
  type: Phaser.AUTO,
  parent: "gameBlock",
  width: gameWidth,
  height: gameHeight,
  scene: [
    gameStart,
  ],
};

const game = new Phaser.Game(config);

ReactDOM.render(<App />, document.getElementById("root"));
