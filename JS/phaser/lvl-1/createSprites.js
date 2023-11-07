//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(386, 600, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);
}


//* SPRITE MURE DE SANG *//
function createFleshWall(scene)
{
    // définition groupe mur de sang
    fleshWall = scene.physics.add.staticGroup();

    // gauche
    for (let i = 0; i < 800; i += 100) fleshWall.create(20, i, "flesh-wall").angle += 90;

    // droite
    for (let i = 0; i < 800; i += 100) fleshWall.create(780, i, "flesh-wall").angle += 90;

    // bas (gauche)
    fleshWall.create(80, 580, "flesh-wall");
    fleshWall.create(220, 580, "flesh-wall");
    fleshWall.create(273, 580, "flesh-wall").flipX = true;

    // bas (droite)
    fleshWall.create(508, 580, "flesh-wall");
    fleshWall.create(650, 580, "flesh-wall").flipX = true;
    fleshWall.create(750, 580, "flesh-wall");

    // haut (gauche)
    fleshWall.create(80, 20, "flesh-wall");
    fleshWall.create(220, 20, "flesh-wall");
    fleshWall.create(263, 20, "flesh-wall").flipX = true;

    // haut (droite)
    fleshWall.create(508, 20, "flesh-wall");
    fleshWall.create(650, 20, "flesh-wall").flipX = true;
    fleshWall.create(750, 20, "flesh-wall");
}


//* SPRITES BORDURE DENTS *//
function createBorderTeeth(scene)
{
    // définition groupe dents
    staticTeeth = scene.physics.add.staticGroup();

    // ligne du haut (gauche)
    for (let i = 75; i < 350; i+=35) staticTeeth.create(i, 25, "tooth").flipY = true;

    // ligne du haut (droite)
    for (let i = 450; i < 750; i+=35) staticTeeth.create(i, 25, "tooth").flipY = true;

    // ligne du bas (gauche)
    for (let i = 50; i < 350; i+=35) staticTeeth.create(i, 575, "tooth");

    // ligne du bas (droite)
    for (let i = 450; i < 750; i+=35) staticTeeth.create(i, 575, "tooth");

    // ligne gauche
    for (let i = 25; i < 575; i+=35) staticTeeth.create(25, i, "tooth").angle += 90;

    // ligne droite
    for (let i = 25; i < 575; i+=35) staticTeeth.create(775, i, "tooth").angle -= 90;
}


//* SPRITES CHEMIN DENTS *//
function createTeethPath()
{
    for (let i = 150; i < 725; i+=35) fleshWall.create(i, 475, "gencive");
    for (let i = 150; i < 725; i += 35) staticTeeth.create(i, 475, "tooth");

    for (let i = 150; i < 450; i+=35) fleshWall.create(150, i, "gencive").angle += 90;
    for (let i = 150; i < 450; i+=35) staticTeeth.create(150, i, "tooth").angle += 90;

    for (let i = 150; i < 350; i+=35) fleshWall.create(300, i, "gencive").angle += 90;
    for (let i = 150; i < 350; i+=35) staticTeeth.create(300, i, "tooth").angle += 90;

    for (let i = 300; i < 550; i+=35) fleshWall.create(i, 370, "gencive");
    for (let i = 300; i < 550; i += 35) staticTeeth.create(i, 370, "tooth");

    for (let i = 150; i < 375; i+=35) fleshWall.create(650, i, "gencive").angle -= 90;
    for (let i = 150; i < 375; i+=35) staticTeeth.create(650, i, "tooth").angle -= 90;

    for (let i = 70; i < 275; i+=35) fleshWall.create(447, i, "gencive").angle -= 90;
    for (let i = 70; i < 275; i+=35) staticTeeth.create(447, i, "tooth").angle -= 90;
}


//* SPRITES ELTS BOUCHE *//
function createMouseElts(scene)
{
    // sang squelette
    blood = scene.physics.add.staticGroup();
    blood.create(450, 530, "blood-0");

    // squelette mort
    deadThings = scene.physics.add.staticGroup();
    deadThings.create(465, 535, "squeletton");

    // sang rat
    blood.create(600, 385, "blood-1").setScale(0.5).angle += 15;

    // rat mort
    deadThings.create(600, 380, "rat").setScale(0.8).angle -= 20;

    // bouclier cassé
    deadThings.create(290, 70, "shield").setScale(0.9).angle -= 15;
    // 2e invisible pour hitbox épée
    deadThings.create(300, 100, "shield").setAlpha(0);

    // épée cassé
    deadThings.create(305, 85, "sword").setScale(1.2).angle += 25;
}