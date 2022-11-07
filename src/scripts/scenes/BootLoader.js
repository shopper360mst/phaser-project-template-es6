export default class BootLoader extends Phaser.Scene {
    constructor() {
        super("BootLoader");
        console.log("BootLoader loaded...");
    }
    preload() {
        this.load.baseURL = 'assets/';
        this.load.image('loading', 'loading_bar.png');
        this.load.image('reverse', 'sprites/reverseoutc.png');
    }
    create() {
        this.scene.start("Preloader");
    }
    update() {
        //no update tick
    }
}