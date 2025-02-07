// abstract class
export default class Agathe extends Phaser.Physics.Arcade.Sprite {

    // readonly
    static spriteName = "agathe";
    // protected
    currentDirection = "right";
    // protected
    isDead = false;

    constructor(scene, x, y) {
        super(scene, x, y, Agathe.spriteName);

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)

        this.setSize(21, 8)
        this.setOffset(5, 40);

        this.createAnimations(scene);
    }

    // private
    createAnimations(scene) {
        this.createAfkAnims(scene);
        this.createMovingAnims(scene);

        // const anims = ["down", "left", "right", "up"];
        // let frame = 0;
        // for(const anim of anims) {

        //     // Afk anims
        //     scene.anims.create({
        //         key: anim,
        //         frames: [ { key: Agathe.spriteName, frame: frame } ],
        //         frameRate: 20
        //     });

        //     // Moving anims
        //     scene.anims.create({
        //         key: anim,
        //         frames: scene.anims.generateFrameNumbers(Agathe.spriteName, { start: frame, end: frame+3 }),
        //         frameRate: 10,
        //         repeat: -1
        //     });

        //     frame += 4;
        // }
    }

    // private
    createAfkAnims(scene) {
        const anims = ["down", "left", "right", "up"];
        // const anims = ["afk-0", "afk-4", "afk-8", "afk-12"];
        let frame = 0;
        for(const anim of anims) {
            scene.anims.create({
                key: `afk-${anim}`,
                frames: [ { key: Agathe.spriteName, frame: frame } ],
                frameRate: 20
            });

            frame += 4;
        }
    }

    // private
    createMovingAnims(scene) {
        const anims = ["down", "left", "right", "up"];
        let start = 0;
        let end = start + 3;
        for(const anim of anims) {
            scene.anims.create({
                key: `move-${anim}`,
                frames: scene.anims.generateFrameNumbers(Agathe.spriteName, { start: start, end: end }),
                frameRate: 10,
                repeat: -1
            });

            start += 4;
            end += 4;
        }
    }

    static preloadSprite(scene) {
        scene.load.spritesheet(Agathe.spriteName, "../../../../img/sprites/agathe/agathe-sprite.png", { frameWidth: 32, frameHeight: 48 });
    }
}
