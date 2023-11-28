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
    // bordures horizontales
    canvasBorder.create(400, 10, "horizontalBorder");
    canvasBorder.create(400, 590, "horizontalBorder");

    // bordures verticales
    canvasBorder.create(10, 140, "verticalBorder");
    canvasBorder.create(10, 460, "verticalBorder");
    canvasBorder.create(790, 140, "verticalBorder");
    canvasBorder.create(790, 460, "verticalBorder");
}


//* AFFICHAGE DES PNJs *//
function displayPNJs()
{
    // vieux sur le caca
    oldOnPoop.create(750, 225, "old-on-poop");
}


//* AFFICHAGE IMAGES PLATES *//
function displayFlatThings()
{
    // caca
    flatThings.create(750, 255, "flat-poop-0").setScale(0.5);
    flatThings.create(35, 305, "blood-1").setScale(1.3).angle -= 90;
}