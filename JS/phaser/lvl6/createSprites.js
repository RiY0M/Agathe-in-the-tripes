//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(15, 300, "agathe").setDepth(10)
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);
}


//* CREATION DE LA MAP *//
function createMap(scene)
{
    // ajout de la route invisible
    roadBorder.create(400, 333, "road");
}