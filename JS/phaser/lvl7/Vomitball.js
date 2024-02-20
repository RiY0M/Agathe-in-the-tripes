"use strict";

class Vomitball extends Phaser.GameObjects.Sprite {

    targetX = this.x;
    targetY = this.y;
    speedX = 0;
    speedY = 0;

    constructor(scene, x, y) {
        // Call the parent constructor
        super(scene, x, y, 'vomitball');

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);

        createVomitballAnim(scene);
        this.anims.play("vomitballAnims", true);

        this.body.setSize(50, 55);
        this.setScale(0.9);
        this.setDepth(6);

        this.speed = 200;
        this.isAlive = false;

        this.on('spawnVomitShard', () => {
            vomitshard.spawnVomitShard(this.x, this.y, boss.x, boss.spawnVomitball); // Set initial position to vomitball position
        });
    }

    throwVomitball(initialX, initialY, targetX, targetY) {
        this.setPosition(initialX, initialY);
        this.setActive(true);
        this.setVisible(true);
        this.isAlive = true;
        this.body.enable = true;


        this.targetX = targetX;
        this.targetY = targetY;

        const diffX = initialX - targetX;
        const diffY = initialY - targetY; // Sera toujours positif puisque la boule ne peux pas aller en haut

        const distance = Math.sqrt(Math.pow(Math.abs(diffX), 2) + Math.pow(diffY, 2));

        this.speedX = (this.speed * diffX) / distance;
        this.speedY = (this.speed * diffY) / distance;

        this.rotation = Math.asin(diffX / distance) - Math.PI / 2;
    }

    spawnVomitshard() {
        // Trigger the event to throw a vomitshard with the boss's current position
        this.emit('spawnVomitShard', this.x, this.y);
    }

    update(time, delta) {
        if (!this.isAlive) {
            return;
        }

        this.x -= this.speedX * delta / 1000;
        this.y -= this.speedY * delta / 1000;

        // Check if the vomitball is not out of bounds
        if (this.x < game.config.width && this.x > 0 && this.y < 320) {
            return;
        }

        this.setActive(false);
        this.setVisible(false);
        this.isAlive = false;
        this.body.enable = false;

        this.spawnVomitshard();
    }
}
