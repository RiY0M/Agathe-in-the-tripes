import Agathe from "./Agathe.js";

export default class TopAgathe extends Agathe {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    createMoveX(cursors, diagonal = false) {
        const speed = diagonal ? 160 : 135.8;

        /* GAUCHE */
        if (cursors.left.isDown) {
            this.setVelocityX(-speed);

            this.currentDirection = "left";

            if(diagonal) {
                this.createMoveY(cursors);
            }
        }
        /* DROITE */
        else if (cursors.right.isDown) {
            this.setVelocityX(speed);

            this.currentDirection = "right";

            if(diagonal) {
                this.createMoveY(cursors);
            }
        } else {
            this.setVelocityX(0);
        }
    }
    
    createMoveY(cursors, diagonal = false) {
        const speed = diagonal ? 160 : 135.8;

        /* HAUT */
        if (cursors.up.isDown) {
            this.setVelocityY(-speed);

            this.currentDirection = "up";

            if(diagonal) {
                this.createMoveX(cursors);
            }
        }
        /* BAS */
        else if (cursors.down.isDown) {
            this.setVelocityY(speed);

            this.currentDirection = "down";

            if(diagonal) {
                this.createMoveX(cursors);
            }
        } else {
            this.setVelocityY(0);
        }
    }
    
    createMove(cursors) {

        if(this.isDead) {
            return false;
        }

        this.createMoveX(cursors, true);
        if(!this.isMoving) this.createMoveY(cursors, true);
    
        /* AFK */
        if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp) {
            this.anims.play(`afk-${this.currentDirection}`, true);
            this.isMoving = false;
            return this.isMoving;
        }

        this.anims.play(`move-${this.currentDirection}`, true);
        this.isMoving = true;
        return this.isMoving;
    }
}
