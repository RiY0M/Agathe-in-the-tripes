//^ ANIMATIONS AGATHE (CLAVIER) ^//

function createVerticalMove(agathe, cursors, lastFrame)
{
    if (cursors.left.isDown)
    {
        agathe.setVelocityX(-170);
        agathe.anims.play('left', true);
        lastFrame = 4;
    }
    else if (cursors.right.isDown)
    {
        agathe.setVelocityX(170);
        agathe.anims.play('right', true);
        lastFrame = 8;
    }
    else
    {
        // si aucune touche du clavier n'est appuyée : on arrête agathe
        agathe.setVelocityX(0);
        
        // pose du joueur selon la dernière touche (gauche/droite/haut/bas)
        agathe.anims.play("afk-" + lastFrame);
    }
    if (cursors.up.isDown && agathe.body.touching.down)
    {
        agathe.setVelocityY(-200);
    }
}