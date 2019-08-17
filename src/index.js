import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import './index.css';

const gameWidth = 1920;
const gameHeight = 1080;

const gameStart = {
    key: 'gameStart',
    preload: function(){
      this.load.image('sky', 'src/assets/background/sky_old.png');
      this.load.image('cloud', 'src/assets/background/cloud_old.png');
      this.load.image('city', 'src/assets/background/city.png');
      this.load.image('road', 'src/assets/background/road.png');
    },
    create: function(){
      this.sky = this.add.tileSprite(gameWidth/2, 640/2, gameWidth, 640, 'sky');
      this.cloud = this.add.tileSprite(971/2, 394/2+283, 971, 394, 'cloud');
      this.city = this.add.tileSprite(gameWidth/2, 430/2+215, gameWidth, 430, 'city');
      this.road = this.add.tileSprite(gameWidth/2, 460/2+619, gameWidth, 460, 'road');
    },
    update: function(){
      this.sky.tilePositionX += 1;
      this.city.tilePositionX += 2;
      this.road.tilePositionX += 4;
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
  ]
};

const game = new Phaser.Game(config);

// function preload() {
//   this.load.image("logo", logoImg);
// }

// function create() {
//   const logo = this.add.image(400, 150, "logo");
//   this.tweens.add({
//     targets: logo,
//     y: 450,
//     duration: 2000,
//     ease: "Power2",
//     yoyo: true,
//     loop: -1
//   });
// }

ReactDOM.render(<App />, document.getElementById("root"));
