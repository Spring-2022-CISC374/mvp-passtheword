import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import GuessScene from './scenes/GuessScene'
import MainMenuScene from './scenes/MainMenuScene'
import CreatePassScene from './scenes/CreatePassScene'
import EndScene from './scenes/EndScene'

export const config = {
    width: 256*2,
    height: 272,
    backgroundColor: 0x353956,
    scene: [BootScene, GuessScene, MainMenuScene, CreatePassScene, EndScene],
    pixleArt: true,
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

export default new Phaser.Game(config)
