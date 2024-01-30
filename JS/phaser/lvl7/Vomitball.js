"use strict";

class Vomitball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // Call the parent constructor
        super(scene, x, y, 'vomitball');

        // Add the fireball to the scene
        scene.add.existing(this);

        // Enable physics for the fireball
        // scene.physics.world.enable(this);

        // Set additional properties for the fireball
        this.speed = 30; // You can adjust the speed
        this.isAlive = false; // Flag to check if the fireball is active
    }

    // Custom method to initialize the fireball
    throwVomitball(x, y) {
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.isAlive = true;
    }

    // Custom method to update the fireball
    update(time, delta) {
        if (!this.isAlive) {
            return;
        }
        // Move the fireball to the right (adjust as needed)
        this.x += this.speed * delta / 1000;

        // Check if the fireball is out of bounds
        if (this.x <= game.config.width) {
            return;
        }

        this.setActive(false);
        this.setVisible(false);
        this.isAlive = false;
    }
}

class Boss extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "boss");

        // Add the boss to the scene
        scene.add.existing(this);

        // Enable physics for the boss
        scene.physics.world.enable(this);

        // this.setCollideWorldBounds(true); // on définit les collisions avec la bordure
        // Additional properties
        this.speed = 100;
        this.vomitballCooldown = 3000;
        this.lastVomitballTime = 0;
    }

    update(time, delta) {
        // Boss update logic...

        if (this.x < 0) {
            this.x = 0;  // If the boss goes beyond the left border, set its position to the left border
        } else if (this.x > game.config.width) {
            this.x = game.config.width;  // If the boss goes beyond the right border, set its position to the right border
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
        this.emit('throwVomitball', this.x, this.y);
    }
}
