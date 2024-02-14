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

        // this.vomitshard = new Vomitshard(this, -100, -100).setDepth(4); // Initialize off-screen
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

        // create explosion

        this.spawnVomitshard();
    }
}

class Vomitshard extends Phaser.GameObjects.Sprite {

    targetX = this.x;
    targetY = this.y;
    speedX = 0;
    speedY = 0;
    isMoving = false;

    constructor(scene, x, y) {
        // Call the parent constructor
        super(scene, x, y, 'vomitshard');

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setActive(true);
        this.setVisible(true);
        this.body.setAllowGravity(false);
        this.setScale(1.1);
        this.isAlive = true;
        this.body.enable = true;
        this.speed = 120;
    }

    spawnVomitShard(initialX, initialY, targetX, targetY) {

        this.x = initialX;
        this.y = initialY;

        this.targetX = targetX;
        this.targetY = targetY;

        const diffX = this.x - targetX;
        const diffY = this.y - targetY; // Sera toujours positif puisque la boule ne peux pas aller en haut

        const distance = Math.sqrt(Math.pow(Math.abs(diffX), 2) + Math.pow(Math.abs(diffY), 2));

        this.speedX = (this.speed * diffX) / distance;
        this.speedY = (this.speed * diffY) / distance;

        this.rotation = Math.asin(diffX / distance) - Math.PI / 2;
    }

    update(time, delta) {
        if (!this.isAlive) {
            return;
        }

        this.x -= this.speedX * delta / 1000;
        this.y -= this.speedY * delta / 1000;

        // Check if the vomitball is not out of bounds
        if (this.x < game.config.width && this.x > 0 && this.y < 0) {
            return;
        }

        this.setActive(false);
        this.setVisible(false);
        this.isAlive = false;
        this.body.enable = false;
        this.isMoving = false;
    }
}

class Boss extends Phaser.GameObjects.Sprite {

    maxHealth = 21;
    health = this.maxHealth;
    isInvicible = false;
    isMoving = false;
    initialYBoss = this.y; // Stocker la position initiale en Y du boss
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

        // Disable gravity for the vomitball
        this.body.setAllowGravity(false);

        // this.setCollideWorldBounds(true); // on définit les collisions avec la bordure
        // Additional properties
        this.speed = 100;

        // this.on('throwVomitball', () => {
        //     this.vomitball.throwVomitball(this.x, this.headY, agathe.x, agathe.y); // Set initial position to boss position
        // });

        // this.vomitball = new Vomitball(this, -100, -100).setDepth(4); // Initialize off-screen
        // this.vomitball.on('spawnVomitShard', () => {
        //     this.vomitball.vomitshard.spawnVomitShard(this.vomitball.x, this.vomitball.y, this.x, this.headY); // Set initial position to boss position
        // });
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

        // Check if enough time has passed since the last vomitball throw
        if (!vomitball.isAlive) { //  && vomitBallCD
            // Decide to throw a vomitball (replace this with your own logic)
            if (Math.random() < 0.01) {
                this.throwVomitball();
            }
        // } else {
            // this.vomitball.update(time, delta);
        }

        // Move the boss to the right (adjust as needed)
        // this.x += this.speed * delta / 1000;
    }

    throwVomitball() {
        // Trigger the event to throw a vomitball with the boss's current position
        this.emit('throwVomitball', this.x, this.headY);
    }

    movingDown(speed){
        let calcul = this.y + speed;
        this.setY(calcul);
        
    }
    movingUp(speed){
        let calcul = this.y - speed;
        this.setY(calcul);
    }

    hideAndReappear(speed) {
        this.isMoving = true; 
        let delayX;
        
        const moveDown = () => {    //Gere deplacement progressif vers le bas
            if (this.y < game.config.height) {
                this.movingDown(speed); // Fait descendre le worm
                setTimeout(moveDown, 16); // Appele recursivement la fct toutes les 16ms pour obtenir un mouvement fluide
            } else {
                this.x = agathe.x - this.x > 0 ? agathe.x - 80 : agathe.x + 80; this.y += 50;
                // this.scene.physics.add.overlap(agathe, this, collidePlayerProjectile()).name = 'boss_colider';;
                this.emit('bossReachedBottom');
                setTimeout(() => moveUp(agathe.x), 1500); // Attendre 1.5sec avant de remonter vers Agathe
            }
        };
    
        const moveUp = (targetX) => {  // Gère le déplacement progressif vers le haut
            if (this.y > this.initialYBoss) {
                this.movingUp(speed); // Fait remonter le worm
                // Delai pour suivre agathe
                delayX = targetX - this.x > 0 ? 1 : -1; // De quel coté le boss doit aller ?
                this.x += delayX; // Applique le décalage sur l'axe x
                setTimeout(() => moveUp(targetX), 16); // Appele recursivement la fct toutes les 16ms pour obtenir un mouvement fluide
            } else {
                this.isMoving = false;

                // this.scene.physics.world.colliders.getActive().find(function(i){
                //     return i.name == 'boss_colider'
                // }).destroy();
                this.emit('bossReachedTop');
            }
        };
    
        moveDown(); // Lance deplacement
    }

}