"use strict";

class Vomitball extends Phaser.GameObjects.Sprite {

    targetX = this.x;
    targetY = this.y;
    speedX = 0;
    speedY = 0;

    constructor(scene, x, y) {
        // Call the parent constructor
        super(scene, x, y, 'vomitball');

        // Add the fireball to the scene
        scene.add.existing(this);

        // Enable physics for the fireball
        scene.physics.world.enable(this);

        // Disable gravity for the fireball
        this.body.setAllowGravity(false);

        createVomitballAnim(scene);
        this.anims.play("vomitballAnims", true);

        // Set the size of the hitbox
        this.body.setSize(50, 55);
        // this.body.setOffset(5);
        // set the size of the texture
        this.setScale(0.9);

        // Set additional properties for the fireball
        this.speed = 120; // You can adjust the speed
        this.isAlive = false; // Flag to check if the fireball is active
    }

    // Custom method to initialize the fireball
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

    update(time, delta) {
        if (!this.isAlive) {
            return;
        }

        this.x -= this.speedX * delta / 1000;
        this.y -= this.speedY * delta / 1000;

        // Check if the fireball is not out of bounds
        if (this.x < game.config.width && this.x > 0 && this.y < 320) {
            return;
        }

        this.setActive(false);
        this.setVisible(false);
        this.isAlive = false;
        this.body.enable = false;

        // create explosion
    }
}

class Boss extends Phaser.GameObjects.Sprite {

    maxHealth = 21;
    health = this.maxHealth;
    isInvicible = false;
    vomitballCooldown = 3000;
    lastVomitballTime = 0;
    headY;

    constructor(scene, x, y) {
        super(scene, x, y, "boss");
        this.headY = y - 200;

        // Add the boss to the scene
        scene.add.existing(this);

        // Enable physics for the boss
        scene.physics.world.enable(this);

        // Disable gravity for the fireball
        this.body.setAllowGravity(false);

        // this.setCollideWorldBounds(true); // on définit les collisions avec la bordure
        // Additional properties
        this.speed = 100;
        // this.vomitballCooldown = 3000;
        // this.lastVomitballTime = 0;
    }

    setY(y) {
        this.y = y;
        this.headY = y - 200;
    }

    update(time, delta) {
        // Boss update logic...

        if (this.x < 0) {
            this.x = 0; // If the boss goes beyond the left border, set its position to the left border
        } else if (this.x > game.config.width) {
            this.x = game.config.width; // If the boss goes beyond the right border, set its position to the right border
        }

        // Check if enough time has passed since the last fireball throw
        if (time - this.lastVomitballTime > this.vomitballCooldown) {
            // Decide to throw a fireball (replace this with your own logic)
            if (Math.random() < 0.01) {
                this.throwVomitball();
                this.lastVomitballTime = time;
            }
        }

        // Move the boss to the right (adjust as needed)
        // this.x += this.speed * delta / 1000;
    }

    throwVomitball() {
        // Trigger the event to throw a fireball with the boss's current position
        this.emit('throwVomitball', this.x, this.headY);
    }
}
