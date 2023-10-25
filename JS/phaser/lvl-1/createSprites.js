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