"use strict";

//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(200, initialY, "agathe")
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

//* SPRITES OBSTACLES *//
function createObstacles(scene)
{
    // groupement d'obstacles
    obstacles = scene.physics.add.staticGroup();

    // Xmin 500
    // grossses pierres

    const blobs = [
        [760, 263],
        [1410, 239],
        [1780, 270],
        // Ligne de sécurité pour la passage dangereux
        [1900, 340],
        // fin de la ligne de sécurité
        // alternance des blobs
        [2650, 295],
        [3050, 295],
        // fin de l'alternance des blobs
        // cehmin des boules
        [4300, 295],
        // fin du chemin
        [getRandomIntInclusive(6300, 6450), getRandomIntInclusive(230, 360)],
        [getRandomIntInclusive(6450, 6600), getRandomIntInclusive(230, 360)],
    ];

    blobs.forEach(blob => obstacles.create(blob[0], blob[1], "blob"));

    const vomits = [
        [2125, 320],
        [getRandomIntInclusive(5000, 5100), 271],
        [getRandomIntInclusive(5100, 5250), 327],
        [getRandomIntInclusive(5350, 5600), 300],
        [getRandomIntInclusive(5600, 5800), 275],
        [getRandomIntInclusive(5800, 5900), 239],
        [getRandomIntInclusive(6000, 6100), 349],
        [getRandomIntInclusive(6100, 6200), 231],
        [getRandomIntInclusive(6200, 6300), 244],
        [getRandomIntInclusive(6600, 6800), 272],
        [getRandomIntInclusive(6800, 6900), 326],
    ];

    vomits.forEach(vomit => obstacles.create(vomit[0], vomit[1], "vomit"));

    const meatballs = [
        [1207, 233],
        [1898, 233],
        [2024, 297],
        [2294, 252],
        [2337, 336],
        // alternance des blobs
        [3400, 230],
        [3400, 295],
        [3400, 365],
        // fin de l'alternance des blobs
        // Chemin de boules
        [3650, 255],
        [3650, 330],
        [3700, 255],
        [3700, 330],
        [3750, 260],
        [3750, 335],
        [3800, 275],
        [3800, 350],
        [3850, 275],
        [3850, 350],
        [3900, 255],
        [3900, 330],
        [3950, 235],
        [3950, 310],
        [4000, 230],
        [4000, 305],
        [4050, 240],
        [4050, 315],
        [4100, 250],
        [4100, 325],
        [4150, 250],
        [4150, 325],
        [4200, 225],
        [4200, 365],
        [4250, 225],
        [4250, 365],
        [4300, 225],
        [4300, 365],
        [4350, 225],
        [4350, 365],
        [4400, 230],
        [4400, 355],
        [4450, 240],
        [4450, 345],
        [4500, 250],
        [4500, 335],
        [4550, 255],
        [4550, 330],
        [4600, 255],
        [4600, 330],
        // fin du chemin
        [getRandomIntInclusive(4700, 6900), getRandomIntInclusive(230, 360)],
    ];

    meatballs.forEach(meatball => obstacles.create(meatball[0], meatball[1], "meatball"));

    const logs = [
        [900, 350],
        [1120, 280],
        [1390, 340],
        [1645, 310],
        // alternance des blobs
        [2450, 235],
        [2450, 345],
        [2850, 235],
        [2850, 345],
        [3250, 235],
        [3250, 345],
        // fin de l'alternance des blobs
        // Chemin de boules
        [3600, 235],
        [3600, 345],
        // fin du chemin
        [4800, getRandomIntInclusive(235, 345)],
        [5300, getRandomIntInclusive(235, 345)],
        [5700, getRandomIntInclusive(235, 345)],
        [6100, getRandomIntInclusive(235, 345)],
        [6450, getRandomIntInclusive(235, 345)],
    ];

    logs.forEach(log => obstacles.create(log[0], log[1], "log"));

    const houses = [
        [540, 265],
        [7000, 320],
    ];

    houses.forEach(house => obstacles.create(house[0], house[1], "house"));
}

//* Création de la fin du niveau *//
function createEnd(scene) {

    finNiv = scene.physics.add.staticGroup();

    finNiv.create(7300, 250, "border-1").setAlpha(0);
    finNiv.create(7300, 300, "border-1").setAlpha(0);
    finNiv.create(7300, 350, "border-1").setAlpha(0);
    finNiv.create(7400, 250, "border-1").setAlpha(0);
    finNiv.create(7400, 300, "border-1").setAlpha(0);
    finNiv.create(7400, 350, "border-1").setAlpha(0);
}