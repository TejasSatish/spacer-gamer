import { playerSpeed,browser } from "./constants"; 
export class Example extends Phaser.Scene
{
    
    constructor ()
    {
        super();
        this.player
        this.cursor
        this.playerSpeed
          
        this.asteroids=[]
    }

    preload ()
    {
        
        this.load.image("bg", "assets/spacebg.jpg")
        this.load.image("ship", "assets/Shiptest.png");
        this.load.image('asteroid', 'assets/asteroid.png');
    }

    create ()
    {
        const bg = this.add.image(0,0,"bg").setOrigin(0,0)
        bg.setDisplaySize(this.game.config.width, this.game.config.height);
        
        this.player = this.physics.add.image(browser.maxX/2,browser.maxY*0.8,"ship").setOrigin(0,0)
        this.player.setScale(0.05,0.05)
        this.player.setImmovable(true)
        this.player.body.allowGravity = false
        this.player.setCollideWorldBounds(true)


        this.cursor = this.input.keyboard.createCursorKeys()

        this.randomlySpawnXAsteroids(10)
    }

    update(){
        
        const { left, right, up, down } = this.cursor;
     

        if (left.isDown && right.isDown) {
            this.player.setVelocityX(0);
            
        } else if (left.isDown) {
            this.player.setVelocityX(-playerSpeed);
            
        } else if (right.isDown) {
            this.player.setVelocityX(playerSpeed);
            
        } else if (up.isDown && down.isDown) {
            this.player.setVelocityY(0);
            
        } else if (up.isDown) {
            this.player.setVelocityY(-playerSpeed);
            
        } else if (down.isDown) {
            this.player.setVelocityY(playerSpeed);
            
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        
    }


    randomlySpawnXAsteroids(n){
        console.log('hi')
        console.log(this.asteroids)
        for(let i=0;i<n;i++){

            var spawnOffScreenLeftX=browser.minX-Phaser.Math.Between(50,400)
            var spawnOffScreenLeftY=browser.minY-Phaser.Math.Between(50,400)
            var spawnOffScreenRightX=browser.maxX+Phaser.Math.Between(50,400)
            var spawnOffScreenRightY=browser.maxY+Phaser.Math.Between(50,400)
            
            var leftOrRight=Phaser.Math.Between(1,4)
            var size = Phaser.Math.Between(1,10);

            var x,y
            if(leftOrRight===1){
                x=spawnOffScreenLeftX
                y=spawnOffScreenLeftY
            }else{
                x=spawnOffScreenRightX
                y=spawnOffScreenRightY
            }

            console.log(`${x},${y},${1/size}`)
            var asteroid=this.physics.add.image(x,y,'asteroid').setScale(1/size)
            this.randomlySetVelocityAndDirection(asteroid,x,y)
            
            this.asteroids.push(asteroid)
        }
    }

    randomlySetVelocityAndDirection(asteroid,x,y){
        var dx=Phaser.Math.Between(50,400);
        var dy=Phaser.Math.Between(50,400);

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
}

