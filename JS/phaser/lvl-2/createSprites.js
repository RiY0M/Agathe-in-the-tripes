
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
        backgrounds.push(scene.add.image(i*864 - 432, 300, "map"+i));
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
        [526, 260],
        [760, 263],
        [1220, 250],
        [1410, 239],
        [1780, 270],
        // Ligne de sécurité pour la passage dangereux
        [1700, 340],
        [1740, 340],
        [1780, 340],
        [1820, 340],
        [1860, 340],
        [1900, 340],
        // fin de la ligne de sécurité
        // alternance des cailloux
        [2600, 295],
        [3100, 295],
        // fin de l'alternance des cailloux
    ];

    rocks0.forEach(rock0 => rocks.create(rock0[0], rock0[1], "rock-0"));

    // const rocks1 = [
    //     [540, 270],
    // ];

    // rocks1.forEach(rock1 => rocks.create(rock1[0], rock1[1], "rock-1"));

    const rocks2 = [
        [540, 270],
        [610, 300],
        [703, 357],
        [1207, 233],
        [1400, 255],
        [1500, 340],
        [1898, 233],
        [1925, 297],
        // alternance des cailloux
        [2600, 230],
        [2600, 365],
        [3100, 230],
        [3100, 365],
        [3400, 230],
        [3400, 295],
        [3400, 365],
        // fin de l'alternance des cailloux
        // Chemin de cailloux
        [3650, 260],
        [3650, 325],
        [3700, 260],
        [3700, 325],
        [3750, 260],
        [3750, 325],
        [3800, 260],
        [3800, 325],
        [3850, 260],
        [3850, 325],
        [3900, 260],
        [3900, 325],
        [3950, 260],
        [3950, 325],
        [4000, 260],
        [4000, 325],
        [4050, 260],
        [4050, 325],
        [4100, 260],
        [4100, 325],
        [4150, 260],
        [4150, 325],
        [4200, 260],
        [4200, 325],
        [4250, 260],
        [4250, 325],
        [4300, 260],
        [4300, 325],
        [4350, 260],
        [4350, 325],
        [4400, 260],
        [4400, 325],
        [4450, 260],
        [4450, 325],
        [4500, 260],
        [4500, 325],
        [4550, 260],
        [4550, 325],
        [4600, 260],
        [4600, 325],
        [4650, 260],
        [4650, 325],
        [4700, 260],
        [4700, 325],
        [4750, 260],
        [4750, 325],
        [4800, 260],
        [4800, 325],
        [4850, 260],
        [4850, 325],
        [4900, 260],
        [4900, 325],
        [4950, 260],
        [4950, 325],
        [5000, 260],
        [5000, 325],
        [5050, 260],
        [5050, 325],
        [5100, 260],
        [5100, 325],
        [5150, 260],
        [5150, 325],
        [5200, 260],
        [5200, 325],
        [5250, 260],
        [5250, 325],
        [5300, 260],
        [5300, 325],
        [5350, 260],
        [5350, 325],
        [5400, 260],
        [5400, 325],
        [5450, 260],
        [5450, 325],
        [5500, 260],
        [5500, 325],
        [5550, 260],
        [5550, 325],
        [5600, 260],
        [5600, 325],
        [5650, 260],
        [5650, 325],
        [5700, 260],
        [5700, 325],
        [5750, 260],
        [5750, 325],
        [5800, 260],
        [5800, 325],
        [5850, 260],
        [5850, 325],
        [5900, 260],
        [5900, 325],
        [5950, 260],
        [5950, 325],
        [6000, 260],
        [6000, 325],
        [6050, 260],
        [6050, 325],
        [6100, 260],
        [6100, 325],
        [6150, 260],
        [6150, 325],
        [6200, 260],
        [6200, 325],
        [6250, 260],
        [6250, 325],
        [6300, 260],
        [6300, 325],
        [6350, 260],
        [6350, 325],
        [6400, 260],
        [6400, 325],
        [6450, 260],
        [6450, 325],
        [6500, 260],
        [6500, 325],
        [6550, 260],
        [6550, 325],
        [6600, 260],
        [6600, 325],
        [6650, 260],
        [6650, 325],
        [6700, 260],
        [6700, 325],
        [6750, 260],
        [6750, 325],
        [6800, 260],
        [6800, 325],
        [6850, 260],
        [6850, 325],
        [6900, 260],
        [6900, 325],
        [6950, 260],
        [6950, 325],
        [7000, 260],
        [7000, 325],
        // fin du chemin
    ];

    rocks2.forEach(rock2 => rocks.create(rock2[0], rock2[1], "rock-2"));

    const rocks3 = [
        [850, 350],
        [900, 300],
        [1200, 270],
        [1390, 340],
        [1645, 300],
        [1985, 297],
        // alternance des cailloux
        [2300, 235],
        [2300, 345],
        [2850, 235],
        [2850, 345],
        [2850, 235],
        [3250, 235],
        [3250, 345],
        // fin de l'alternance des cailloux
        // Chemin de cailloux
        [3600, 235],
        [3600, 345],
        // fin du chemin
    ];

    rocks3.forEach(rock3 => rocks.create(rock3[0], rock3[1], "rock-3"));
}

//* Création de la fin du niveau *//
function createEnd(scene) {

    finNiv = scene.physics.add.staticGroup();

    // finNiv.create(200, 250, "border-1");
    // finNiv.create(8200, 300, "border-1");
    // finNiv.create(8200, 350, "border-1");
    finNiv.create(7300, 250, "border-1").setAlpha(0);
    finNiv.create(7300, 300, "border-1").setAlpha(0);
    finNiv.create(7300, 350, "border-1").setAlpha(0);
}