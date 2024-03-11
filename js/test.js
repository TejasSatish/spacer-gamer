import { browser, playerSpeed, laserSpeed, playerMaxHealth, playerRotationSpeed, playerMovementDrag, shootCooldown, invincibilty } from "./constants"; 
export class Example extends Phaser.Scene
{
    
    constructor ()
    {
        super();
        this.playerHealth = playerMaxHealth

    }

    preload ()
    {
        
        this.load.image("bg", "assets/spacebg.jpg")
        this.load.image("ship", "assets/Shiptest.png");
        this.load.image('asteroid', 'assets/asteroid1.png');
        this.load.image("laser", "assets/laser.png");

    }

    create ()
    {

        
        const bg = this.add.image(0,0,"bg").setOrigin(0,0)
        bg.setDisplaySize(this.game.config.width, this.game.config.height);

        this.laserGroup = this.add.group();

        this.player = this.physics.add.image(browser.maxX/2,browser.maxY*0.8,"ship").setOrigin(0.5,0.5).setAngle(0)
        this.player.setScale(0.05,0.05)
        this.player.setImmovable(true)
        this.player.setCollideWorldBounds(true)
        this.playerAngle=Phaser.Math.DegToRad(0)
        this.offsetX=0
        this.offsetY=-50
        this.cursor = this.input.keyboard.createCursorKeys()

        this.cursor = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            turnLeft:Phaser.Input.Keyboard.KeyCodes.A,
            turnRight:Phaser.Input.Keyboard.KeyCodes.D,
            shoot:Phaser.Input.Keyboard.KeyCodes.SPACE});

        this.gunReady = true;
        this.pointer = this.input.activePointer;
        

        this.asteroids = this.add.group();
        this.time.addEvent({
            delay: 2000,
            loop: true,
            callback: () =>this.randomlySpawnAsteroid()
        })
        this.physics.add.collider(this.asteroids,this.asteroids)
        this.physics.add.collider(
            this.asteroids,
            this.player,
            ()=> this.reducePlayerHealth()
            )
        this.physics.add.collider(this.laserGroup,this.asteroids)
    }

    update(){
        
        const {  up, turnLeft, turnRight, shoot } = this.cursor;

        
        if (turnLeft.isDown) {
            this.player.rotation -= playerRotationSpeed;
        }
        if (turnRight.isDown) {
            this.player.rotation += playerRotationSpeed;
        }
    
        const angle = this.player.rotation;
        const xSpeed = Math.sin(angle) * playerSpeed;
        const ySpeed = Math.cos(angle) * playerSpeed;
    
        
        if (up.isDown) {
            
            this.player.setVelocityX(+xSpeed);
            this.player.setVelocityY(-ySpeed);
            this.player.setDrag(playerMovementDrag);
        }
          
        if(this.pointer.leftButtonDown() || shoot.isDown){
            this.shootlaser();
        }
    }

    shootlaser(){
        if(!this.cooldown){
            this.barrelX = this.player.x + this.offsetX * Math.cos(this.player.rotation);
            this.barrelY = this.player.y + this.offsetY * Math.sin(this.player.rotation);
            var laser=this.physics.add.image(this.barrelX,this.barrelY,"laser").setScale(0.05,0.05)
            // .setOrigin(1,0)
            // laser.setCircle(100)
            laser.rotation = this.player.rotation
            
            const angle = this.player.rotation;
            var xSpeed = Math.sin(angle) * laserSpeed;
            var ySpeed = Math.cos(angle) * laserSpeed;
            this.barrelX = this.player.x + this.offsetX;
            this.barrelY = this.player.y + this.offsetY;

            laser.setVelocityX(+xSpeed);
            laser.setVelocityY(-ySpeed);
            this.laserGroup.add(laser);

            this.cooldown=true
            this.time.delayedCall(shootCooldown,()=>{ this.cooldown=false })
        }
    }

    randomlySpawnAsteroid(){

        var spawnOffScreenLeftX=browser.minX-Phaser.Math.Between(50,400)
        var spawnOffScreenLeftY=browser.minY-Phaser.Math.Between(50,400)
        var spawnOffScreenRightX=browser.maxX+Phaser.Math.Between(50,400)
        var spawnOffScreenRightY=browser.maxY+Phaser.Math.Between(50,400)
        
        var leftOrRight=Phaser.Math.Between(1,4)
        var size = Phaser.Math.Between(1,5);

        var x,y
        if(leftOrRight===1){
            x=spawnOffScreenLeftX
            y=spawnOffScreenLeftY
        }else{
            x=spawnOffScreenRightX
            y=spawnOffScreenRightY
        }

        // console.log(`${x},${y},${1/size}`)
        var asteroid=this.physics.add.image(x,y,'asteroid').setScale(1/size)
        // .setOrigin(0.5,0.5)
        // asteroid.setCircle(size*10)
        this.randomlySetVelocityAndDirection(asteroid,x,y)

        this.asteroids.add(asteroid)
    }

    randomlySetVelocityAndDirection(asteroid,x,y){
        var dx=Phaser.Math.Between(20,50);
        var dy=Phaser.Math.Between(20,50);

        if(x>=browser.maxX){
            dx=-dx
        }
        if(y>=(browser.maxY/2)){
            dy=-dy
        }
        console.log(`${dx},${dy}`)
        asteroid.setVelocityX(dx)
        asteroid.setVelocityY(dy)
    }

    reducePlayerHealth(){
        if(!this.invincible){
            console.log('ooopsie') 
            if (this.playerHealth > 0){
                this.playerHealth = this.playerHealth - 1;
                console.log(this.playerHealth);
            }else{
                console.log("Game Over");
            }
            this.invincible=true
            this.time.delayedCall(invincibilty,()=>{ this.invincible=false })
        }
    }
}

