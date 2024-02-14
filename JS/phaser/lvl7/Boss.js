"use strict";

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
        if (time - this.lastVomitballTime > this.vomitballCooldown && !this.isMoving) {
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

        // premier déplacement
        let firstMove = true;
        
        const moveDown = () => {    //Gere deplacement progressif vers le bas

            if (this.y < game.config.height) {
                this.movingDown(speed); // Fait descendre le worm
                setTimeout(moveDown, 16); // Appele recursivement la fct toutes les 16ms pour obtenir un mouvement fluide
            } else {
                this.x = agathe.x - this.x > 0 ? agathe.x - 80 : agathe.x + 80; this.y += 50;

                // boss atteint le bas
                this.emit('bossReachedBottom');

                // si on retourne à l'arrière du bg on change le depth
                if (!firstMove) this.setDepth(1);
                else this.setDepth(3);
                setTimeout(() => {moveUp(agathe.x), 3000}); // Attendre 1.5sec avant de remonter vers Agathe
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

                // boss atteint le haut
                this.emit('bossReachedTop');

                // on repart pour un second tour si on est encore au premier plan
                if (firstMove) {

                    firstMove = false;
                    // on attend avant de retourner au fond du bg
                    setTimeout(() => {
                        moveDown(agathe.x), 3000
                    });
                }
            }
        };
    
        moveDown(); // Lance deplacement
    }

}