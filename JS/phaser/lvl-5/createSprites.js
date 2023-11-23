//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(15, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);
}


//* BORDURE DU CANVAS *//
function displayCanvasBorder()
{
    canvasBorder.create(400, 10, "horizontalBorder");
    canvasBorder.create(400, 590, "horizontalBorder");
    canvasBorder.create(10, 130, "verticalBorder");
    canvasBorder.create(10, 470, "verticalBorder");
    canvasBorder.create(790, 130, "verticalBorder");
    canvasBorder.create(790, 470, "verticalBorder");
}