export default class PlayGameScene extends Phaser.Scene {
    constructor() {
      super('PlayGameScene');
      console.log('PlayGameScene loaded...');
    }
  
    create() {
        this.resetGameState();
        this.generateMap();
        this.generateHUD();
        this.anims.create({
           key : 'drive',
           frames: this.anims.generateFrameNumbers('car'),
           frameRate : 24, 
           repeat : -1
        });
        this.anims.create({
            key: 'road',
            frames: this.anims.generateFrameNumbers('anim_road'),
            frameRate : 30,
            repeat: -1,
        });

        this.leftLane = this.add.sprite(230, this.game.config.height/2, 20, this.game.config.height,'anim_road')
        .setScale(0.5 , 1);
        this.leftLane.play('road');
        this.rightLane = this.add.sprite(this.game.config.width - 230, this.game.config.height/2, 20, this.game.config.height,'anim_road')
        .setScale(0.5 , 1);
        this.rightLane.play('road');
        this.resetAvatar();
    }
    update(){
        this.gameTick++;
        this.score++;
        this.generateMob();
        this.flyOver();
        this.moveAvatar();
        this.levelProgress();
        this.scoreText.text = this.score;
        if(!this.gameOver){
            if(this.mobGroup.children.entries.length > 0){
                if(this.mobGroup.children.entries[0].y > 1000){
                    this.mobGroup.children.entries[0].destroy();
                }

            }
        }
    }
    levelProgress(){
        if(this.score > 300 && this.level == 1){
            this.level = 2;
            this.levelVelocity = 20;
            this.dualLaneInterval = 60;
        }
        else if(this.score > 1000 && this.level == 2){
            this.level = 3;
            this.levelVelocity = 40;
            this.dualLaneInterval = 40;
        }
        else if(this.score > 1500 && this.level == 3){
            this.spawnFlyOver = true;
            this.level = 4;
            this.levelVelocity = 60;
            this.dualLaneInterval = 30;
            this.flyOverInterval = 360;
        }
        else if(this.score > 2000 && this.level == 4){
            this.level = 5;
            this.levelVelocity = 80;
            this.dualLaneInterval = 20;
            this.flyOverInterval = 250;
        }
    }
    resetAvatar(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.car = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2 + 200,'car')
        .setScale(0.5);
        this.car.play('drive');
        this.physics.add.collider(this.car, this.mobGroup, this.carCrash, null, this);
    }
    carCrash(car, mob){
        console.log('crash');
        this.gameOver = true;
        this.car.body.angularVelocity = 500;
    }
    resetGameState(){
        this.gameOver = false;
        this.spawnFlyOver = false;
        this.level = 1;
        this.gameTick = 0;
        this.score = 0;
        this.mobInterval = 60;
        this.dualLaneInterval = 120;
        this.flyOverInterval = 360;
        this.levelVelocity = 10;
        this.levelProgression =[[0,0,0,0,1],[0,0,0,1,1],[0,0,1,1,2],[0,1,1,2,2],[0,1,2,2,3],[1,1,2,3,4]];
        this.mobGroup = this.physics.add.group({ immovable: true });
    }
    moveAvatar(){
        if(this.gameOver)
            return;
        this.input.on('pointermove', function (pointer) {
            if(pointer.isDown){
                this.car.x = pointer.x;
                if(this.car.x < this.yellowLine.x + 50){
                    this.car.x = this.yellowLine.x + 50;
                }
                this.car.body.angularVelocity =  -80;
                if(this.car.rotation < -0.1)
                this.car.rotation = -0.2;
            }
        }, this);

        if (this.cursors.left.isDown) {
            this.car.x -= 6;
            this.car.body.angularVelocity =  -80;
            if(this.car.rotation < -0.1)
            this.car.rotation = -0.2;
            if(this.car.x < this.yellowLine.x + 50){
                this.car.x = this.yellowLine.x + 50;
            }
            // if (joystick.x <= this.deadZoneLeft) {
            //   joystick.x = this.deadZoneLeft;
            // }
          } else if (this.cursors.right.isDown) {
            this.car.x += 6;
            this.car.body.angularVelocity = 80;
            if(this.car.rotation > 0.2)
                this.car.rotation = 0.2;
            if(this.car.x > this.yellowLine2.x -  50){
                this.car.x = this.yellowLine2.x - 50;
            }
            // if (joystick.x >= this.deadZoneRight) {
            //   joystick.x = this.deadZoneRight;
            // }
          }
          else{
            if(this.car.rotation != 0){
                this.car.body.angularVelocity = 0;
                if(this.car.rotation > 0){
                    this.car.rotation -= 0.1;
                    if(this.car.rotation < 0 && this.car.rotation > -0.1){
                        this.car.rotation = 0;
                    }
                }
                else if(this.car.rotation < 0){
                    this.car.rotation += 0.1;
                    if(this.car.rotation > 0 && this.car.rotation < 0.1){
                        this.car.rotation = 0;
                    }
                }
            }
          }
    }
    flyOver(){
        if(this.spawnFlyOver){
            if(this.gameTick % this.flyOverInterval == 0){
                this.physics.add.image(this.game.config.width / 2, -500, 'fly_over')
                .setVelocityY(500 + this.levelVelocity);
            }
        }
    }
    generateMob(){
        if(this.gameTick % this.mobInterval == 0 && this.gameTick % this.flyOverInterval !== 0){
        var randNum = Phaser.Math.RND.pick(this.levelProgression[this.level]);
        // var posX = Phaser.Math.RND.pick([this.leftLane.x + 50, this.leftLane.x + 200]);
        var leftRightCenter = Phaser.Math.RND.pick([-1,0,1]);
        if (randNum == 0){
            if(leftRightCenter == -1){
                var posX = this.leftLane.x - 90;
            }
            else if(leftRightCenter == 0){
                var posX = this.leftLane.x + 90;
            }
            else{
                var posX = this.rightLane.x + 90;
            }
            var mob = this.mobGroup.create(posX , -500,'mob' + randNum)
            .setScale(0.5)
            .setVelocityY(500 + this.levelVelocity);
        }
        else if(randNum == 1 || randNum == 2){
            if(this.gameTick % this.dualLaneInterval == 0){
                if(leftRightCenter == -1){
                    var posX1 = this.leftLane.x - 90;
                    var posX2 = this.leftLane.x + 90;
                }
                else if(leftRightCenter == 0){
                    var posX1 = this.leftLane.x - 90;
                    var posX2 = this.rightLane.x + 90;
                }
                else{
                    var posX1 = this.rightLane.x - 90;
                    var posX2 = this.rightLane.x + 90;
                }
                var mob1 = this.mobGroup.create(posX1, -500, 'mob' + randNum)
                .setScale(0.5)
                .setVelocityY(500 + this.levelVelocity);
                var mob2 = this.mobGroup.create(posX2, -500, 'mob' + randNum)
                .setScale(0.5)
                .setVelocityY(500 + this.levelVelocity);
            }
            else{
                    if(leftRightCenter == -1){
                        var posX = this.leftLane.x - 90;
                    }
                    else if(leftRightCenter == 0){
                        var posX = this.leftLane.x + 90;
                    }
                    else{
                        var posX = this.rightLane.x + 90;
                    }
                var mob = this.mobGroup.create(posX, -500, 'mob' + randNum)
                .setScale(0.5)
                .setVelocityY(500 + this.levelVelocity);
            }
        }
        else if(randNum == 3){
            var leftRight = Phaser.Math.RND.pick([-1,1]);
                if(leftRightCenter == -1){
                    if(leftRight == -1)
                        var posX = this.leftLane.x - 90;
                    else
                        var posX = this.leftLane.x;
                }
                else if(leftRightCenter == 0){
                    var posX = this.leftLane.x + 90;
                }
                else{
                    if(leftRight == -1)
                        var posX = this.leftLane.x + 90;
                    else
                        var posX = this.leftLane.x;
                }
            var mob = this.mobGroup.create(posX , -500,'mob' + randNum)
            .setScale(0.5)
            .setVelocityY(500 + this.levelVelocity);
        }
        else if(randNum == 4){
            if(leftRightCenter == -1){
                var posX = this.leftLane.x - 90;
            }
            else if(leftRightCenter == 0){
                var posX = this.leftLane.x + 90;
            }
            else{
                var posX = this.rightLane.x + 90;
            }
            var mob = this.mobGroup.create(posX , -500,'mob' + randNum)
            .setScale(0.5)
            .setVelocityY(500 + this.levelVelocity);
        }
        }
    }
    generateHUD(){
        this.scoreText = this.add.text( this.game.config.width /2, 50, '0', 
        { font: '48px Courier', fill: '#ffffff', align: 'center' }
        ).setOrigin(0.5);
    }
    generateMap(){
        this.add.tileSprite(this.game.config.width / 2, this.game.config.height / 2, 
        this.game.config.width, this.game.config.height, 'road');
        this.yellowLine = this.add.tileSprite(50, this.game.config.height/2, 20, this.game.config.height,'white_line')
        .setScale(0.5 , 1);
        this.yellowLine2 = this.add.tileSprite(this.game.config.width - 50, this.game.config.height/2, 20, this.game.config.height,'white_line')
        .setScale(0.5 , 1);
    }
  }