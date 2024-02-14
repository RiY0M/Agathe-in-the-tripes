"use strict";

class Boss extends Phaser.GameObjects.Sprite {

    maxHealth = 21;
    health = this.maxHealth;
    isInvicible = false;
    isMoving = false;
    initialYBoss = this.y; // Stocker la position initiale en Y du boss
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

        this.speed = 100;
        this.setHealth(this.maxHealth);
    }

    setY(y) {
        this.y = y;
        this.headY = y - 200;
    }

    //* Créer et gère les PV de barre de vie *//
    setHealth(value){ // Fonction qui s'occupe de la barre de vie du boss
        this.health = value;

        const widthBar = 700; // Taille barre de vie
        const percentBar = Phaser.Math.Clamp(this.health, 0, this.maxHealth) / this.maxHealth; // Nb de pv : Ici de 0 -> 21
    
        const centerX = (config.width - widthBar) / 2;
    
        const graphics = this.scene.add.graphics().setDepth(5);
        graphics.clear();
        graphics.fillStyle(0xff6600);
        graphics.fillRoundedRect(centerX, 550, widthBar, this.maxHealth, 5);
    
        if (percentBar > 0){
            graphics.fillStyle(0xff0000);
            graphics.fillRoundedRect(centerX, 550, widthBar * percentBar, this.maxHealth, 5)
        }
    }

    update(time, delta) {
        // Boss update logic...

        if (this.x < 0) {
            this.x = 0; // If the boss goes beyond the left border, set its position to the left border
        } else if (this.x > game.config.width) {
            this.x = game.config.width; // If the boss goes beyond the right border, set its position to the right border
        }

        // Check if enough time has passed since the last fireball throw
        if (!vomitball.isAlive) {
            // Decide to throw a fireball (replace this with your own logic)
            if (Math.random() < 0.01) {
                this.throwVomitball();
            }
        }
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