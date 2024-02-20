"use strict";

class Vomitshard extends Phaser.GameObjects.Sprite {

    targetX = this.x;
    targetY = this.y;
    speedX = 0;
    speedY = 0;
    isMoving = false;
    hasTouched = false;

    constructor(scene, x, y) {
        // Call the parent constructor
        super(scene, x, y, 'vomitshard');

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.setScale(1.1);
        this.setDepth(6);
        this.isAlive = true;
        this.body.enable = true;
        this.speed = 200;
        this.body.setOffset(0, 10);
    }
    
    spawnVomitShard(initialX, initialY, targetX, targetY) {
        
        // Ne créé pas de nouvelle shard si il y en a déjà une qui bouge
        if(this.isMoving) {
            return;
        }

        this.setPosition(initialX, initialY);
        this.setActive(true);
        this.setVisible(true);
        this.isAlive = true;
        this.body.enable = true;

        this.targetX = targetX;
        this.targetY = targetY;

        const diffX = this.x - targetX;
        const diffY = this.y - targetY;

        const distance = Math.sqrt(Math.pow(Math.abs(diffX), 2) + Math.pow(Math.abs(diffY), 2));

        this.speedX = (this.speed * diffX) / distance;
        this.speedY = (this.speed * diffY) / distance;

        this.rotation = Math.asin(-diffX / distance);
    }

    update(time, delta) {
        if(!this.hasTouched) {
            if (!this.isMoving) {
                return;
            }
    
            this.x -= this.speedX * delta / 1000;
            this.y -= this.speedY * delta / 1000;
    
            // Check if the vomitshard is not out of bounds
            if (this.x < game.config.width && this.x > 0 && this.y > 0) {
                return;
            }
        }

        this.setActive(false);
        this.setVisible(false);
        this.isAlive = false;
        this.body.enable = false;
        this.isMoving = false;
        this.hasTouched = false;
    }
}
