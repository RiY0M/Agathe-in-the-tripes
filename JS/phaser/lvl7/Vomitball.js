"use strict";

class Vomitball extends Phaser.GameObjects.Sprite {

    targetX = this.x;
    targetY = this.y;
    speedX = 0;
    speedY = 0;

    constructor(scene, x, y) {
        // Call the parent constructor
        super(scene, x, y, 'vomitball');

        // Add the vomitball to the scene
        scene.add.existing(this);

        // Enable physics for the vomitball
        scene.physics.world.enable(this);

        // Disable gravity for the vomitball
        this.body.setAllowGravity(false);

        createVomitballAnim(scene);
        this.anims.play("vomitballAnims", true);

        // Set the size of the hitbox
        this.body.setSize(50, 55);
        // this.body.setOffset(5);
        // set the size of the texture
        this.setScale(0.9);

        // Set additional properties for the vomitball
        this.speed = 200; // You can adjust the speed
        this.isAlive = false; // Flag to check if the vomitball is active
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

        // this.body.setOffset(-this.speedX / this.speed, -this.speedY / this.speed);

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
