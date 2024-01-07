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


//~ SPRITE RTA ~//
function createRat(scene)
{
    // ajout du rat
    rat = scene.physics.add.sprite(150, 100, "rat").setDepth(9);
    // on définit les collisions avec la bordure
    rat.setCollideWorldBounds(true);
}


//* BORDURE DU CANVAS *//
function displayCanvasBorder()
{
    // bordures horizontales
    canvasBorder.create(400, 5, "horizontalBorder");
    canvasBorder.create(400, 595, "horizontalBorder");

    // bordures verticales gauche
    canvasBorder.create(5, 140, "verticalBorderLeft");
    canvasBorder.create(5, 460, "verticalBorderLeft");

    // bordures verticales droite
    canvasBorder.create(795, 140, "verticalBorderRight");
    canvasBorder.create(795, 460, "verticalBorderRight");

    // bordures noires
    // blackBorders.create(400, 75, "blackBorders").setScale(3).setTint(0x000000).setDepth(10);
    // blackBorders.create(275, 200, "blackBorders").setScale(1).setTint(0x000000).setDepth(10);
    // blackBorders.create(400, 510, "blackBorders").setScale(4).setTint(0x000000).setDepth(10);
    // blackBorders.create(400, 400, "blackBorders").setScale(1).setTint(0x000000).setDepth(10);

    // porte
    poopDoor.create(795, 300, "poop-door").setScale(1.1);
}


//* AFFICHAGE DES PNJs *//
function displayPNJs()
{
    // vieux sur le caca
    oldOnPoop.create(750, 225, "old-on-poop");

    // mineur
    flatThings.create(710, 555, "flat-poop-1").setScale(0.4);
    angryMinor.create(700, 525, "angry-minor-pickaxe").setDepth(2);
}


//* AFFICHAGE IMAGES PLATES *//
function displayFlatThings()
{
    // caca
    flatThings.create(750, 255, "flat-poop-0").setScale(0.5);
    flatThings.create(430, 330, "flat-poop-0").setScale(0.7);
    flatThings.create(40, 490, "flat-poop-0").setScale(0.4);

    flatThings.create(600, 290, "flat-poop-1").setScale(0.7);

    flatThings.create(275, 575, "flat-poop-2").setScale(1.3);


    // sang top
    flatThings.create(340, 30, "blood-0").setScale(1.4).angle = 180;
    flatThings.create(370, 40, "blood-1").setScale(0.8).angle -= 90;

    // caca top
    flatThings.create(460, 50, "flat-poop-1").setScale(0.6);
    flatThings.create(390, 60, "flat-poop-2").setScale(1.2);
    flatThings.create(450, 70, "flat-poop-2").setScale(1.2);



    // sang gauche
    flatThings.create(40, 435, "blood-0").setScale(1.1);
    flatThings.create(120, 560, "blood-1").setScale(1.1);  
    flatThings.create(100, 490, "blood-0").setScale(0.9);

    flatThings.create(50, 50, "blood-1").setScale(1.3).angle -= 45;
    flatThings.create(15, 125, "blood-0").setScale(1.3).angle -= 45;
    flatThings.create(35, 305, "blood-1").setScale(1.3).angle -= 90;
}


//* AFFICHAGE CAILLOUX DE SANG *//
function displayBloodyRocks()
{
    // caca
    bloodyRocks.create(400, 320, "poop-0");
    bloodyRocks.create(615, 305, "poop-0");
    bloodyRocks.create(250, 572, "poop-0");
    bloodyRocks.create(300, 568, "poop-0");

    bloodyRocks.create(460, 305, "poop-1");

    bloodyRocks.create(600, 280, "poop-2");
    bloodyRocks.create(720, 535, "poop-2").setDepth(1);

    // porte entrée
    bloodyRocks.create(15, 335, "blood-rock-0").setScale(1.4);
    bloodyRocks.create(20, 265, "blood-rock-1").setScale(0.7);

    // encerclement coin bas gauche
    bloodyRocks.create(110, 475, "blood-rock-0");
    fakeBloodyRocks.create(100, 490, "blood-rock-2").setDepth(0.9);
    bloodyRocks.create(120, 515, "blood-rock-0");
    bloodyRocks.create(110, 530, "blood-rock-0").setScale(1.3);
    bloodyRocks.create(10, 425, "blood-rock-1");
    bloodyRocks.create(40, 445, "blood-rock-0").setScale(1.4);
    bloodyRocks.create(55, 435, "blood-rock-0");
    bloodyRocks.create(80, 450, "blood-rock-1");
    bloodyRocks.create(120, 560, "blood-rock-1");

    // bâton dynamite
    sticks.create(380, 30, "stick").angle -= 30;

    // top gauche
    bloodyRocks.create(15, 15, "blood-rock-1");
    bloodyRocks.create(120, 15, "blood-rock-1");
    bloodyRocks.create(60, 5, "blood-rock-1");
    bloodyRocks.create(5, 70, "blood-rock-1");
    bloodyRocks.create(90, 35, "blood-rock-0").setScale(1.5);
    bloodyRocks.create(20, 115, "blood-rock-0").setScale(1.3);
    bloodyRocks.create(15, 150, "blood-rock-1");

    // middle top
    bloodyRocks.create(350, 25, "blood-rock-1");
    bloodyRocks.create(320, 15, "blood-rock-0").setScale(1.2);
    bloodyRocks.create(355, 60, "blood-rock-0");
    bloodyRocks.create(410, 45, "poop-2").setScale(1);
    flatThings.create(485, 20, "poop-0").setScale(1.1);
    bloodyRocks.create(470, 40, "poop-2").setScale(1.2);
    bloodyRocks.create(385, 60, "blood-rock-2");
    bloodyRocks.create(440, 50, "poop-1").setScale(1);
    bloodyRocks.create(420, 60, "poop-0").setScale(1);
    bloodyRocks.create(470, 55, "poop-0").setScale(1);

    // pierre chelou pudreuse
    strangeRock.create(55, 40, "powder-rock");
    bloodyRocks.create(40, 65, "blood-rock-0").setScale(1.1);

    // bâton dynamite
    sticks.create(70, 575, "stick").angle -= 90;

    // squelet assis
    deadThings.create(85, 565, "squeleton-sit").setTint(0xebebeb).setScale(0.8).angle += 10;
    deadThings.create(40, 480, "bones-pile").setTint(0xFFFFFF).setScale(0.7);

    // bâton dynamite
    sticks.create(20, 480, "stick").angle -= 100;
}


//* AFFICHAGE POUDRE A CANON *//
function displayPowder(scene)
{
    powder.create(50, 40, "powder");
}