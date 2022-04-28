import "phaser"

import {BootScene} from './BootScene'
import {GuessScene} from './GuessScene'
import {MainMenuScene} from './MainMenuScene'
import {CreatePassScene} from './CreatePassScene'
import {EndScene} from './EndScene'

export const size = {x: 256*2, y: 272}
const config : GameConfig= {
    width: size.x,
    height: size.y,
    backgroundColor: 0x000000,
    scene: [BootScene, GuessScene, MainMenuScene, CreatePassScene, EndScene],
    physics: {
        default: "arcade",
        arcade: {debug:false}
    }
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
