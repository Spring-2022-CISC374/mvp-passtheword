import "phaser"

import {BootScene} from './BootScene'
import {GuessScene} from './GuessScene'
import {MainMenuScene} from './MainMenuScene'
import {CreatePassScene} from './CreatePassScene'
import {EndScene} from './EndScene'
import {TransitionScene} from './TransitionScene'
import {ChargeScreen} from './ChargeScreen'
import {Tutorial} from './Tutorial'

export const size = {x: 800, y: 350}
const config : GameConfig= {
    width: size.x,
    height: size.y,
    backgroundColor: 0x000000,
    parent: 'game',
    dom: {
      createContainer: true
    },
    callbacks: {
      postBoot: function (game) {
        game.domContainer.style.pointerEvents = 'none';
      },
    },
    scene: [BootScene, GuessScene, MainMenuScene, CreatePassScene, TransitionScene, EndScene, ChargeScreen, Tutorial],
    physics: {
        default: "arcade",
        arcade: {debug:false}
    }
}

export const musicConfig = {
  mute: false,
  volume: 0.2,
  rate: 1,
  detune: 0,
  seek: 0,
  loop: true,
  delay: 0
}

export const gameSettings = {
    playerSpeed : 100,
    enemySpeed : 40,
    spawnRate : 300, // lower number = more frequent spawns
    startingLives : 3,
}

export class PTWGame extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
};

window.onload = () => {
  var game = new PTWGame(config);
};
