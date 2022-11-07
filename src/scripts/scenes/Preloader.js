export default class Preloader extends Phaser.Scene {
  constructor() {
    super('Preloader');
    console.log('Preloader loaded...');
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(160, 440, 320, 50);

    this.load.baseURL = 'assets/';
    this.load.image('phaser-logo', 'phaser-logo.png');

    this.load.image('exit', 'sprites/exit.png');
    this.load.spritesheet('muteunmute', 'sprites/muteunmute.png', { frameWidth : 96, frameHeight : 90 });
    this.load.spritesheet('spinner','sprites/loader_sprites.png', { frameWidth : 150, frameHeight : 150 });

    //GUI
    this.load.image('game_title', 'sprites/game_title.png');
    this.load.image('game_over','sprites/game_over.png');
    this.load.image('btn_start','sprites/start.png');
    this.load.image('btn_retry','sprites/retry.png');
    this.load.image('board', 'sprites/board.png');

    //To be TileSprites
    this.load.image('fly_over', 'sprites/road_over.png');
    this.load.image('road', 'sprites/road.png');
    this.load.image('grass', 'sprites/grass.png');
    this.load.image('road_line_tiler', 'sprites/road_line_tiler.png');
    this.load.image('yellow_line', 'sprites/yellow_line.png');
    this.load.image('white_line', 'sprites/white_line.png');

    this.load.spritesheet('trees', 'sprites/trees.png', { frameWidth : 140, frameHeight : 1024 });
    this.load.spritesheet('anim_road', 'sprites/anim_road.png',{frameWidth : 20, frameHeight : 960});
    this.load.spritesheet('car','sprites/car_sprite.png', {frameWidth : 160, frameHeight : 320});
    this.load.image('mob0', 'sprites/truck.png');
    this.load.image('mob1', 'sprites/racer.png');
    this.load.image('mob2', 'sprites/taxi.png');
    this.load.image('mob3', 'sprites/motor.png');
    this.load.image('mob4', 'sprites/big_truck.png');
    this.load.image('flyover', 'sprites/road_over.png');

    this.load.image('smoke', 'sprites/smoke.png');

    var reverseBtn = this.add.sprite(320, 550, 'reverse').setScale(0.5);
    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(170, 450, 300 * value, 30);
    });
    this.load.on('complete', function () {
        progressBar.destroy();
        reverseBtn.destroy();
        progressBox.destroy();
        // loadingText.destroy();
        // percentText.destroy();
        // assetText.destroy();
    });

  }

  create() {
    this.scene.start('StartScene');

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
