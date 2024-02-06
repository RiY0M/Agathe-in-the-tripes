class LittleWorm extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y) {
        super(scene, x, y, "little-worms");

        // Add the worm to the scene
        scene.add.existing(this);

        // Enable physics
        scene.physics.world.enable(this);

        // Disable gravity
        this.body.setAllowGravity(false);

        // size of hitbox
        this.body.setSize(20, 20);


        //^ ANIMATIONS (CHARGEMENT) ^//
        this.scene.anims.create({
            key: "outAnim",
            frames: scene.anims.generateFrameNumbers("little-worms", { start: 0, end: 7 }),
            frameRate: 10,
        });

        this.scene.anims.create({
            key: "attackAnim",
            frames: scene.anims.generateFrameNumbers("little-worms", { start: 8, end: 13 }),
            frameRate: 10,
        });

        this.scene.anims.create({
            key: "inAnim",
            frames: scene.anims.generateFrameNumbers("little-worms", { start: 16, end: 23 }),
            frameRate: 10,
        });

        //^ ANIMATIONS (LANCEMENT) ^//
        this.anims.play("outAnim", true);
    }

    playAttackAnim() { this.anims.play("attackAnim", true); }
    playInAnim() { 
        this.anims.play("inAnim", true);
        this.on('animationcomplete', () => {this.destroy();});
    }
}