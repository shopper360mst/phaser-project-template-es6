import 'phaser'
import '@babel/polyfill'

import BootLoader from './scenes/BootLoader'
import StartScene from './scenes/StartScene'
import Preloader from './scenes/Preloader'
import PlayGameScene from './scenes/PlayGameScene'

const DEFAULT_WIDTH = 640
const DEFAULT_HEIGHT = 960

window.addEventListener('load', () => {

  const config = {
    type: Phaser.CANVAS,
    backgroundColor: '#000000',
    scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    },
    scene: [BootLoader, Preloader, StartScene,PlayGameScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    }
  };
  const game = new Phaser.Game(config);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);

  function resize() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
  }
})
