//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(15, 320, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);
}


//* CREATION DE LA MAP FRONT *//
function createFrontMap(scene)
{
    // ajout de la route invisible
    roadBorder.create(400, 353, "road").setVisible(false);

    // ajout du pont
    frontMapElement.create(530, 330, "bridge");
}


//* CREATION DE LA MAP BACK *//
function createBackMap(scene)
{
    // soleil
    frontMapElement.create(600, 590, "sun").setTint(0xffd561);

    // falaises
    frontMapElement.create(100, 467, "cliff-1").setScale(0.8);
    frontMapElement.create(605, 300, "cliff-1").setScale(0.8).flipX = true;
    frontMapElement.create(605, 690, "cliff-1").setScale(0.8).setFlip(true, true);

    // queue du ver
    frontMapElement.create(15, 310, "worm-tail").setScale(0.7).angle -= 5;

    // panneau maison
    frontMapElement.create(560, 315, "sign").setScale(0.2);
}