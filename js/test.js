import { playerSpeed,browser,playerMaxHealth,playerRotationSpeed } from "./constants"; 
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
        this.barrelX=this.player.x
        this.barrelY=this.player.y-50
        this.cursor = this.input.keyboard.createCursorKeys()

        this.cursor = this.input.keyboard.addKeys(
            {up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            turnLeft:Phaser.Input.Keyboard.KeyCodes.A,
            turnRight:Phaser.Input.Keyboard.KeyCodes.D});

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
            ()=>this.time.addEvent({
                delay: 1000,
                callback: () => this.reducePlayerHealth()
            }))
        this.physics.add.collider(this.laserGroup,this.asteroids)
    }

    shootlaser(x,y){
        var laser=this.physics.add.image(x,y,"laser").setScale(0.05,0.05)
        laser.setVelocityY(-300);
        this.laserGroup.add(laser);
        
    }


    update(){
        
        const { left, right, up, down, turnLeft, turnRight } = this.cursor;

        
        if (turnLeft.isDown) {
            this.player.rotation -= playerRotationSpeed;
            this.barrelX=this.player.x - Math.cos(this.player.rotation)*40
            this.barrelY=this.player.y - Math.sin(this.player.rotation)*30
        }
        if (turnRight.isDown) {
            this.player.rotation += playerRotationSpeed;
            this.barrelX=this.player.x + Math.cos(this.player.rotation)*40
            this.barrelY=this.player.y + Math.sin(this.player.rotation)*30
        }
    
        const angle = this.player.rotation;
        const xSpeed = Math.sin(angle) * playerSpeed;
        const ySpeed = Math.cos(angle) * playerSpeed;
    
        
        if (up.isDown) {
            
            this.player.setVelocityX(+xSpeed);
            this.player.setVelocityY(-ySpeed);

        } else if (down.isDown) {
            
            this.player.setVelocityX(-xSpeed); 
            this.player.setVelocityY(+ySpeed); 
            
        } else {
            
            this.player.setVelocity(0);
        }

        this.input.on('pointerdown', pointer => {
            console.log(this.player.rotation)
            this.shootlaser(this.barrelX,this.barrelY);
            delay(1000)
        })          
                
                
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
        console.log('ooopsie')
         
        if (this.playerHealth > 0){
            
            this.playerHealth = this.playerHealth - 1;
            console.log(this.playerHealth);

        } else {
            console.log("Game Over");
        }

    }
}

