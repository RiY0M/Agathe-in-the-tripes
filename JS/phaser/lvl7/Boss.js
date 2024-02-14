"use strict";

class Boss extends Phaser.GameObjects.Sprite {

    maxHealth = 21;
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

        this.speed = 100;

        this.setHealth(this.maxHealth);
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

    //* Créer et gère les PV de barre de vie *//
    setHealth(value){ // Fonction qui s'occupe de la barre de vie du boss
        this.health = value;

        const widthBar = 700; // Taille barre de vie
        const percentBar = Phaser.Math.Clamp(this.health, 0, this.maxHealth) / this.maxHealth; // Nb de pv : Ici de 0 -> 21
    
        const centerX = (config.width - widthBar) / 2;
    
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

        // Check if enough time has passed since the last vomitball throw
        if (!vomitball.isAlive) { //  && vomitBallCD
            // Decide to throw a vomitball (replace this with your own logic)
            if (Math.random() < 0.01) {
                this.throwVomitball();
            }
        // } else {
            // this.vomitball.update(time, delta);
        }
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
