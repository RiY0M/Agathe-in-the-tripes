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

        // Set the size of the hitbox (adjust as needed)
        this.body.setSize(64, 64);

        // Set additional properties for the fireball
        this.speed = 100; // You can adjust the speed
        this.isAlive = false; // Flag to check if the fireball is active
    }

    // Custom method to initialize the fireball
    throwVomitball(initialX, initialY, targetX, targetY) {
        this.setPosition(initialX, initialY);
        this.setActive(true);
        this.setVisible(true);
        this.isAlive = true;


        this.targetX = targetX;
        this.targetY = targetY;

        const diffX = initialX - targetX;
        const diffY = initialY - targetY; // Sera toujours positif puisque la boule ne peux pas aller en haut

        const distance = Math.sqrt(Math.pow(Math.abs(diffX), 2) + Math.pow(diffY, 2));

        this.speedX = (this.speed * diffX) / distance;
        this.speedY = (this.speed * diffY) / distance;

        this.rotation = Math.asin(diffX / distance) - (Math.PI/2);
    }

    // Custom method to update the fireball
    update(time, delta) {
        if (!this.isAlive) {
            return;
        }

        this.x -= this.speedX * delta / 1000;
        this.y -= this.speedY * delta / 1000;

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

    health = 21;
    isInvicible = false;
    isMoving = false;
    initialY = this.y; // Stocker la position initiale en Y du boss

    constructor(scene, x, y) {
        super(scene, x, y, "boss");

        // Add the boss to the scene
        scene.add.existing(this);

        // Enable physics for the boss
        scene.physics.world.enable(this);

        // Disable gravity for the fireball
        this.body.setAllowGravity(false);

        // this.setCollideWorldBounds(true); // on définit les collisions avec la bordure
        // Additional properties
        this.speed = 100;
        this.vomitballCooldown = 3000;
        this.lastVomitballTime = 0;
    }

    update(time, delta) {
        // Boss update logic...

        if (this.x < 0) {
            this.x = 0; // If the boss goes beyond the left border, set its position to the left border
        } else if (this.x > game.config.width) {
            this.x = game.config.width; // If the boss goes beyond the right border, set its position to the right border
        }

        // Check if enough time has passed since the last fireball throw
        if (time - this.lastVomitballTime > this.vomitballCooldown && this.isMoving) {
            // Decide to throw a fireball (replace this with your own logic)
            if (Math.random() < 0.01) {
                this.throwVomitball();
                this.lastVomitballTime = time;
            }
        }

        if (true) {
            this.hideAndReappear();
        }


        // Move the boss to the right (adjust as needed)
        // this.x += this.speed * delta / 1000;
    }

    throwVomitball() {
        // Trigger the event to throw a fireball with the boss's current position
        this.emit('throwVomitball', this.x, this.y);
    }

    hideAndReappear() {
        const hideDuration = 5000; // Durée de la disparition (5 secondes)
        const reappearDuration = 3000; // Durée de la réapparition (3 secondes)
    
        // Cacher le boss progressivement en descendant sous terre
        if (this.y < 530) {
            this.setAlpha(Math.max(0, 1 - (this.y - 530) / (game.config.height - 530))); // Réduire progressivement l'opacité
            if (this.alpha === 0) {
                this.setVisible(false); // Cacher le boss lorsque l'opacité atteint 0
            }
        }
    
        // Réapparition progressive du boss après quelques secondes
        setTimeout(() => {
            // Réinitialiser la visibilité et l'opacité du boss
            this.setVisible(true);
            this.setAlpha(1);
    
            // Calculer la vitesse de remontée en fonction de la durée de réapparition
            const speedY = (this.initialY - this.y) / reappearDuration;
    
            // Déplacer progressivement le boss vers sa position initiale en Y
            const reappearTimer = setInterval(() => {
                if (this.y < this.initialY) {
                    this.y += speedY * 16; // 16ms correspond à une frame à 60FPS
                } else {
                    clearInterval(reappearTimer); // Arrêter le déplacement lorsque la position initiale est atteinte
                }
            }, 16); // Répéter toutes les 16ms pour correspondre à un framerate de 60FPS
        }, hideDuration); // Attendre la durée de disparition avant de réapparaître
    }

}