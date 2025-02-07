import Agathe from "./Agathe.js";

export default class AgatheTop extends Agathe {
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    createMoveX(cursors, diagonal = false) {
        const speed = diagonal ? 160 : 135.8;

        /* GAUCHE */
        if (cursors.left.isDown) {
            // vitesse et direction du déplacement
            this.setVelocityX(-speed);
            
            // last frame facing afk
            this.currentDirection = "left";

            if(diagonal) {
                this.createMoveY(cursors);
            }
        }
        /* DROITE */
        else if (cursors.right.isDown) {
            // vitesse et direction du déplacement
            this.setVelocityX(speed);
            
            // last frame facing afk
            this.currentDirection = "right";

            if(diagonal) {
                this.createMoveY(cursors);
            }
        } else {
            // vitesse et direction du déplacement
            this.setVelocityX(0);
        }
    }
    
    createMoveY(cursors, diagonal = false) {
        const speed = diagonal ? 160 : 135.8;

        /* HAUT */
        if (cursors.up.isDown) {
            // vitesse et direction du déplacement
            this.setVelocityY(-speed);

            // last frame facing afk
            this.currentDirection = "up";

            if(diagonal) {
                this.createMoveX(cursors);
            }
        }
        /* BAS */
        else if (cursors.down.isDown) {
            // vitesse et direction du déplacement
            this.setVelocityY(speed);

            // last frame facing afk
            this.currentDirection = "down";

            if(diagonal) {
                this.createMoveX(cursors);
            }
        } else {
            // vitesse et direction du déplacement
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
