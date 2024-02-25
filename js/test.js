import { playerSpeed } from "./constants"; 
export class Example extends Phaser.Scene
{
    
    constructor ()
    {
        super();
        this.player
        this.cursor
        this.playerSpeed
          
    }

    preload ()
    {
        
        this.load.image("bg", "assets/spacebg.jpg")
        this.load.image("ship", "assets/Shiptest.png");

    }

    create ()
    {
        const bg = this.add.image(0,0,"bg").setOrigin(0,0)
        bg.setDisplaySize(this.game.config.width, this.game.config.height);
        
        this.player = this.physics.add.image(window.innerWidth/2,window.innerHeight*0.8,"ship").setOrigin(0,0)
        this.player.setScale(0.05,0.05)
        this.player.setImmovable(true)
        this.player.body.allowGravity = false
        this.player.setCollideWorldBounds(true)


        this.cursor = this.input.keyboard.createCursorKeys()
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

}

