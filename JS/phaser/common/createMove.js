//^ ANIMATIONS AGATHE (CLAVIER) ^//

function createMoveX(agathe, cursors, lastFrame, diagonal = false) {
    const speed = !diagonal ? 160 : 135.8;

    /* GAUCHE */
    if (cursors.left.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(-speed);
        // animation sprite
        if(diagonal) agathe.anims.play("left", true);
        // last frame facing afk
        lastFrame = 4;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;

        if(diagonal) createMoveY(agathe, cursors, lastFrame);
    }

    /* DROITE */
    else if (cursors.right.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(speed);
        // animation sprite
        if(diagonal) agathe.anims.play("right", true);
        // last frame facing afk
        lastFrame = 8;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;

        if(diagonal) createMoveY(agathe, cursors, lastFrame);
    }

    else
    {
        // vitesse et direction du déplacement
        agathe.setVelocityX(0);
    }
    return hasMoved, lastFrame;
}

function createMoveY(agathe, cursors, lastFrame, diagonal = false) {
    const speed = !diagonal ? 160 : 135.8;

    /* HAUT */
    if (cursors.up.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(-speed);
        // animation sprite
        if(diagonal) agathe.anims.play("up", true);
        // last frame facing afk
        lastFrame = 4;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;

        if(diagonal) createMoveX(agathe, cursors, lastFrame);
    }

    /* BAS */
    else if (cursors.down.isDown)
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(speed);
        // animation sprite
        if(diagonal) agathe.anims.play("down", true);
        // last frame facing afk
        lastFrame = 8;

        // on indique qu'on a appuyé sur une touche pour supprimer le message de tuto
        hasMoved = true;

        if(diagonal) createMoveX(agathe, cursors, lastFrame);
    }

    else
    {
        // vitesse et direction du déplacement
        agathe.setVelocityY(0);
    }

    return hasMoved, lastFrame;
}

function createMove(agathe, cursors, lastFrame) {

    hasMoved, lastFrame = createMoveX(agathe, cursors, lastFrame, true);
    hasMoved, lastFrame = createMoveY(agathe, cursors, lastFrame, true);

    /* AFK */
    if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityX(0);
        agathe.setVelocityY(0);
        // pose du joueur selon la dernière touche (gauche/droite/haut/bas)
        agathe.anims.play(`afk-${lastFrame}`);
    }
    return hasMoved;
}