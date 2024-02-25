export class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
        this.asteroids=[]
    }

    preload ()
    {
        this.load.image('asteroid', 'assets/asteroid.png');
    
    }

    create ()
    {
        this.randomlySpawnXAsteroids(10)
    }

    randomlySpawnXAsteroids(n){
        console.log('hi')
        console.log(this.asteroids)
        for(let i=0;i<n;i++){
            var minX=0
            var maxX=window.innerHeight
            var minY=0
            var maxY=window.innerWidth

            var spawnOffScreenLeftX=minX-Phaser.Math.Between(50,400)
            var spawnOffScreenLeftY=minY-Phaser.Math.Between(50,400)
            var spawnOffScreenRightX=maxX+Phaser.Math.Between(50,400)
            var spawnOffScreenRightY=maxY+Phaser.Math.Between(50,400)
            
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

        // if(x>=maxX){
        //     dx=-dx
        // }
        asteroid.setVelocityX(dx)
        asteroid.setVelocityY(dy)
    }
}

