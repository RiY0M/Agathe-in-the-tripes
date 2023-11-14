
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(200, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);
}

//* SPRITE MAP *//
function createMap(scene)
{
    let backgrounds = [];

    for(let i = 1; i <= loopLvl2; i++) {
        backgrounds.push(scene.add.image(i*432, 300, "map"+i));
    }

    return backgrounds;
}

//* SPRITE BORDURE DU HAUT ET DU BAS *//
function createBorders(scene)
{
    // affichage bordure depuis (0;0)
    borders = scene.physics.add.staticGroup();
    // bordures invisibles pour ne pas dépasser du couloir
    borders.create(400, 200, "border-0").setAlpha(0);
    borders.create(400, 410, "border-0").setAlpha(0);
}

//* SPRITES CAILLOUX *//
function createRocks(scene)
{
    // groupement de cailloux
    rocks = scene.physics.add.staticGroup();

    // Xmin 500
    // grossses pierres

    const rocks0 = [
        [500, 230],
        [500, 360],
        [513, 260],
        [718, 263],
        [1020, 250],
    ];

    rocks0.forEach(rock0 => rocks.create(rock0[0], rock0[1], "rock-0"));

    // const rocks1 = [
    //     [540, 270],
    // ];

    // rocks1.forEach(rock1 => rocks.create(rock1[0], rock1[1], "rock-1"));

    const rocks2 = [
        [540, 270],
        [600, 300],
        [680, 357],
        [1007, 233],
    ];

    rocks2.forEach(rock2 => rocks.create(rock2[0], rock2[1], "rock-2"));

    const rocks3 = [
        [850, 350],
        [900, 300],
        [1200, 270],

        [8000, 270],
    ];

    rocks3.forEach(rock3 => rocks.create(rock3[0], rock3[1], "rock-3"));
}

//* Création de la fin du niveau *//
function createEnd(scene) {

    finNiv = scene.physics.add.staticGroup();

    finNiv.create(8200, 250, "border-1").setAlpha(0);
    finNiv.create(8200, 300, "border-1").setAlpha(0);
    finNiv.create(8200, 350, "border-1").setAlpha(0);
}