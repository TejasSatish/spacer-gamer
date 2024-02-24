export class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        
        this.load.spritesheet('sussy', 'assets/pngegg.png', { frameWidth: 1920, frameHeight: 1080});
        this.load.spritesheet('coin', 'assets/pngwing.com.png', { frameWidth: 1920, frameHeight: 1080 });
    
    }

    create ()
    {
        
        // const x = Phaser.Math.Between(100, 700);
        // const y = Phaser.Math.Between(100, 500);
        // const x1 = Phaser.Math.Between(100, 700);
        // const y2 = Phaser.Math.Between(100, 500);
        const x = 300
        const y = 500
        const x1 = 230
        const y1 = 130
        const frame = Phaser.Math.Between(0, 4);
        const frame2 = Phaser.Math.Between(0, 4);
        this.add.sprite(x, y, 'sussy', frame)
        this.add.sprite(x1, y1, 'coin', frame2)
    }


    addAnimation (key)
    {
        this.add.sprite(400, this.y, 'sussy')
            .play(key);
        this.y += 100;
    }
}

