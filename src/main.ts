import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import GuessScene from './scenes/GuessScene'
import MainMenuScene from './scenes/MainMenuScene'
import CreatePassScene from './scenes/CreatePassScene'

export const config = {
    width:256*5,
    height: 272*5,
    backgroundColor: 0x353956,
    scene: [BootScene, GuessScene, MainMenuScene, CreatePassScene],
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
