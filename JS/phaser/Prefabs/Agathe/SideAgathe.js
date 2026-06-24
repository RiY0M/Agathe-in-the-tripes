import Agathe from "./Agathe.js";

export default class AgatheSide extends Agathe {
    constructor(scene, x, y, hitPoints = AgatheSide.maxHp, startPosition = "right") {
        super(scene, x, y, hitPoints, startPosition);
    }

    createVerticalMove(cursors) {

        if (cursors.left.isDown)
        {
            animName = "left"; // Former "lastFrame" var
            this.setVelocityX(-170);
            this.anims.play(animName, true);
        }
        else if (cursors.right.isDown)
        {
            animName = "right";
            this.setVelocityX(170);
            this.anims.play(animName, true);
        }
        else
        {
            // si aucune touche du clavier n'est appuyée : on arrête agathe
            this.setVelocityX(0);

            // pose du joueur selon la dernière touche (gauche/droite/haut/bas)
            this.anims.play(animName);
        }
        if (cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-200);
        }
    }
}
