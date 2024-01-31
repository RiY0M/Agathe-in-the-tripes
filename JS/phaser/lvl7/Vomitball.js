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
    paterneDeplacement = false;

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
        if (time - this.lastVomitballTime > this.vomitballCooldown && !this.isMoving) {
            // Decide to throw a fireball (replace this with your own logic)
            if (Math.random() < 0.01) {
                this.throwVomitball();
                this.lastVomitballTime = time;
            }
        }

        //if (this.paterneDeplacement) this.hideAndReappear(2);
        if (nbHearts == 2) this.hideAndReappear(4);
        

        // Move the boss to the right (adjust as needed)
        // this.x += this.speed * delta / 1000;
    }

    throwVomitball() {
        // Trigger the event to throw a fireball with the boss's current position
        this.emit('throwVomitball', this.x, this.y);
    }

    movingDown(speed){
        this.y += speed;
    }
    movingUp(speed){
        this.y -= speed;
    }

    hideAndReappear(speed) {
        this.isMoving = true; 
        nbHearts = nbHearts - 1;
        let delayX;
        
        const moveDown = () => {    //Gere deplacement progressif vers le bas
            if (this.y < game.config.height) {
                this.movingDown(speed); // Fait descendre le worm
                setTimeout(moveDown, 16); // Appele recursivement la fct toutes les 16ms pour obtenir un mouvement fluide
            } else {
                setTimeout(() => moveUp(agathe.x), 4000); // 4s avant de remonter, puis remonte avec la coordonnée x d'Agathe
            }
        };
    
        const moveUp = (targetX) => {  // Gère le déplacement progressif vers le haut
            if (this.y > this.initialY) {
                this.movingUp(speed); // Fait remonter le worm
                // Delai pour suivre agathe
                delayX = targetX - this.x > 0 ? 1 : -1; // De quel coté le boss doit aller ?
                this.x += delayX; // Applique le décalage sur l'axe x
                setTimeout(() => moveUp(targetX), 16); // Appele recursivement la fct toutes les 16ms pour obtenir un mouvement fluide
            } else {
                this.isMoving = false;
            }
        };
    
        moveDown(); // Lance deplacement
    }

}