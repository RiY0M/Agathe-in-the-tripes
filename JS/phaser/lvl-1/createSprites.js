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


//* SPRITE LANGUE *//
function createTongue(scene)
{
    // affichage grotte en haut à droite
    tongue = scene.physics.add.staticGroup();
    tongue.create(396, 198, "tongue").setScale(2);
}


//* SPRITE BORDURE DU HAUT *//
function createTopBorder(scene)
{
    // bordures permettant de ne pas sortir de la map (en haut)
    topBorder = scene.physics.add.staticGroup();
    topBorder.create(400, 0, "border").setAlpha(0);
}


//* SPRITE MURE DE SANG *//
function createFleshWall(scene)
{
    // bordures permettant de ne pas sortir de la map (en haut)
    fleshWall = scene.physics.add.staticGroup();

    // gauche
    fleshWall.create(215, 50, "flesh-wall").setScale(1.5).angle -= 90;
    fleshWall.create(300, 360, "flesh-wall").setScale(1.5).angle -= 180;
    fleshWall.create(215, 250, "flesh-wall").setScale(1.5).angle -= 90;

    // droite
    fleshWall.create(575, 50, "flesh-wall").setScale(1.5).angle += 90;
    fleshWall.create(480, 300, "flesh-wall").setScale(1.5).angle += 180;
    fleshWall.create(480, 360, "flesh-wall").setScale(1.5).angle += 180;
    fleshWall.create(575, 250, "flesh-wall").setScale(1.5).angle += 90;
}


//* SPRITES DENTS LANGUE *//
function createTeethTongue(scene)
{
    // dents autour de la langue
    staticTeeth = scene.physics.add.staticGroup();
    staticTeeth.create(550, 350, "tooth");
}
