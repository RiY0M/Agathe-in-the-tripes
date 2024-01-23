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

//* SPRITE DENTS *//
function loadSpriteVariables(scene)
{
    // définition groupe dents
    staticTeeth = scene.physics.add.staticGroup();
    movingTeeth1 = scene.physics.add.staticGroup();
    movingTeeth2 = scene.physics.add.staticGroup();
    movingTeeth3 = scene.physics.add.staticGroup();
    movingTeeth4 = scene.physics.add.staticGroup();

    // définition groupe mur de sang
    fleshWall = scene.physics.add.staticGroup();

    // sang squelette et rat
    blood = scene.physics.add.staticGroup();

    // chose morte
    deadThings = scene.physics.add.staticGroup();
}


//* SPRITE MURE DE SANG *//
function createFleshWall()
{
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
function createBorderTeeth()
{
    // ligne du haut (gauche)
    for (let i = 75; i < 350; i+=35) staticTeeth.create(i, 25, "tooth").flipY = true;

    // ligne du haut (droite)
    for (let i = 450; i < 750; i+=35) staticTeeth.create(i, 25, "tooth").flipY = true;

    // ligne du bas (gauche)
    for (let i = 50; i < 350; i+=35) staticTeeth.create(i, 575, "tooth")
        .setSize(45, 46)
        .setOffset(-9, 5);

    // ligne du bas (droite)
    for (let i = 450; i < 750; i+=35) staticTeeth.create(i, 575, "tooth")
        .setSize(45, 46)
        .setOffset(9, 5);

    // ligne gauche
    for (let i = 25; i < 575; i+=35) staticTeeth.create(25, i, "tooth").angle += 90;

    // ligne droite
    for (let i = 25; i < 575; i+=35) staticTeeth.create(775, i, "tooth").angle -= 90;
}


//* SPRITES CHEMIN DENTS FIXES *//
function createTeethPath()
{
    for (let i = 145; i < 475; i+=35) fleshWall.create(140, i, "gencive").angle += 90;
    for (let i = 150; i < 450; i+=35) staticTeeth.create(150, i, "tooth").angle += 90;

    for (let i = 144; i < 700; i+=35) fleshWall.create(i, 485, "gencive");
    for (let i = 150; i < 700; i += 35) staticTeeth.create(i, 475, "tooth")
        .setSize(45, 46)
        .setOffset(-9, 5);

    for (let i = 145; i < 375; i+=35) fleshWall.create(290, i, "gencive").angle += 90;
    for (let i = 150; i < 350; i+=35) staticTeeth.create(300, i, "tooth").angle += 90;

    for (let i = 294; i < 550; i+=35) fleshWall.create(i, 380, "gencive");
    for (let i = 300; i < 550; i += 35) staticTeeth.create(i, 370, "tooth");

    for (let i = 145; i < 375; i+=35) fleshWall.create(660, i, "gencive").angle -= 90;
    for (let i = 150; i < 375; i+=35) staticTeeth.create(650, i, "tooth").angle -= 90;

    for (let i = 70; i < 275; i+=35) fleshWall.create(447, i, "gencive").angle -= 90;
    for (let i = 70; i < 275; i+=35) staticTeeth.create(437, i, "tooth").angle -= 90;
}


//* SPRITES CHEMIN DENTS MOBILES *//
function createMobileTeethPath()
{
    // 1 -> 3
    for (let i = 150; i <= 450; i+=150) {
        fleshWall.create(86, i+7, "moving-gum");
        movingTeeth1.create(85, i, "moving-teeth-up").setScale(0.7)
            .setSize(44, 40)
            .setOffset(18, 20);
    }
    

    // 4
    fleshWall.create(149, 87, "moving-gum");
    movingTeeth2.create(148, 80, "moving-teeth-up").setScale(0.7)
        .setSize(44, 40)
        .setOffset(18, 20);

    // 5
    fleshWall.create(216, 257, "moving-gum");
    movingTeeth3.create(215, 250, "moving-teeth-up").setScale(0.7)
        .setSize(70, 40)
        .setOffset(15, 20);

    // 6
    fleshWall.create(216, 307, "moving-gum");
    movingTeeth3.create(215, 300, "moving-teeth-up").setScale(0.7)
        .setSize(70, 40)
        .setOffset(15, 20);

    // 7
    fleshWall.create(216, 357, "moving-gum");
    movingTeeth1.create(215, 350, "moving-teeth-up").setScale(0.7)
        .setSize(70, 40)
        .setOffset(15, 20);

    
    // 8 -> 9
    for (let i = 370; i <= 420; i+=50) {
        fleshWall.create(716, i, "moving-gum");
        movingTeeth1.create(715, i-7, "moving-teeth-up").setScale(0.7)
            .setSize(44, 40)
            .setOffset(18, 20);
    }

    // 10
    fleshWall.create(716, 250, "moving-gum");
    movingTeeth2.create(715, 243, "moving-teeth-up").setScale(0.7)
        .setSize(44, 40)
        .setOffset(18, 20);

    // 11 -> 12
    for (let i = 90; i <= 140; i+=50) {
        fleshWall.create(716, i, "moving-gum");
        movingTeeth3.create(715, i-7, "moving-teeth-up").setScale(0.7)
            .setSize(44, 40)
            .setOffset(18, 20);
    }


    // 19 -> 20
    for (let i = 150; i <= 300; i+=100) {
        fleshWall.create(371, i+7, "moving-gum");
        movingTeeth4.create(370, i, "moving-teeth-up").setScale(0.7)
            .setSize(60, 40)
            .setOffset(10, 20);
    }

}


//* SPRITES ELTS BOUCHE *//
function createMouseElts()
{
    // sang squelette
    blood.create(450, 530, "blood-0");

    // squelette mort
    deadThings.create(465, 535, "squeletton");

    // sang rat
    blood.create(600, 385, "blood-1").setScale(0.5).angle += 15;

    // rat mort
    deadThings.create(600, 380, "rat").setScale(0.8).angle -= 20;

    // sang bouclier/épée
    blood.create(290, 80, "blood-1").setScale(0.9).angle += 15;

    // bouclier cassé
    deadThings.create(290, 70, "shield").setScale(0.9).angle -= 15;
    // 2e invisible pour hitbox épée
    deadThings.create(300, 100, "shield").setAlpha(0);

    // épée cassé
    deadThings.create(305, 85, "sword").setScale(1.2).angle += 25;


    // fin de gencives
    fleshWall.create(680, 485, "gencive");
    fleshWall.create(550, 380, "gencive");
    fleshWall.create(660, 365, "gencive").angle -= 90;
    fleshWall.create(447, 250, "gencive").angle -= 90;
}


//* SPRITE COEUR DU SQUELETTE *//
function createSquelettonHeart(scene)
{
    // sang du coeur
    blood.create(530, 535, "blood-1").setScale(0.5);

    // coeur du squelette
    squelettonHeart = scene.physics.add.group()
    squelettonHeart.create(530, 535, "squeletton-heart").setScale(0.7).angle += 25;
}