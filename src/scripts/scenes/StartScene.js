import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'

export default class StartScene extends Phaser.Scene {
  fpsText

  constructor() {
    super('StartScene');
  }

  create() {
    this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'game_title');
    this.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 300, 'btn_start')
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      this.scene.start('PlayGameScene');
    });
  }

  update() {
  }
}
