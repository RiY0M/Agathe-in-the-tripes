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

    // bordures verticales gauche
    canvasBorder.create(10, 140, "verticalBorderLeft");
    canvasBorder.create(10, 460, "verticalBorderLeft");

    // bordures verticales droite
    canvasBorder.create(790, 140, "verticalBorderRight");
    canvasBorder.create(790, 460, "verticalBorderRight");
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

    // sang
    flatThings.create(35, 305, "blood-1").setScale(1.3).angle -= 90;
}


//* AFFICHAGE CAILLOUX DE SANG *//
function displayBloodyRocks()
{
    // sang
    flatThings.create(40, 435, "blood-0").setScale(1.1);
    flatThings.create(120, 560, "blood-1").setScale(1.1);  
    flatThings.create(100, 490, "blood-0").setScale(0.9);

    // porte entrée
    bloodyRocks.create(15, 335, "blood-rock-0").setScale(1.4);
    bloodyRocks.create(20, 265, "blood-rock-1").setScale(0.7);

    // encerclement coin bas gauche
    bloodyRocks.create(110, 475, "blood-rock-0");
    fakeBloodyRocks.create(100, 490, "blood-rock-2");
    bloodyRocks.create(120, 515, "blood-rock-0");
    bloodyRocks.create(110, 530, "blood-rock-0").setScale(1.3);
    bloodyRocks.create(10, 425, "blood-rock-1");
    bloodyRocks.create(40, 445, "blood-rock-0").setScale(1.4);
    bloodyRocks.create(55, 435, "blood-rock-0");
    bloodyRocks.create(80, 450, "blood-rock-1");
    bloodyRocks.create(120, 560, "blood-rock-1");

    // squelet assis
    deadThings.create(85, 565, "squeleton-sit").setScale(0.8).angle += 10;
}