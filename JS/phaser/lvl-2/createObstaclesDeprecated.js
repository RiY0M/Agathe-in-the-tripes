//! Fichiher déprécié mais pour un niveau plus difficile

//* SPRITES CAILLOUX *//
function createObstacles(scene)
{
    // groupement de cailloux
    obstacles = scene.physics.add.staticGroup();

    // Xmin 500
    // grossses pierres

    const blobs = [
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
        // cehmin des cailloux
        [5150, 295],
        // fin du chemin
        [getRandomIntInclusive(6300, 6450), getRandomIntInclusive(230, 360)],
        [getRandomIntInclusive(6450, 6600), getRandomIntInclusive(230, 360)],
    ];

    blobs.forEach(blob => obstacles.create(blob[0], blob[1], "blob"));

    const meatballs = [
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
        [3650, 335],
        [3700, 250],
        [3700, 325],
        [3750, 240],
        [3750, 315],
        // [3800, 220],
        [3800, 295],
        // [3850, 200],
        [3850, 275],
        // [3900, 200],
        [3900, 275],
        // [3950, 220],
        [3950, 295],
        [4000, 240],
        [4000, 315],
        [4050, 260],
        [4050, 335],
        [4100, 280],
        [4100, 355],
        [4150, 300],
        // [4150, 375],
        [4200, 320],
        // [4200, 395],
        [4250, 325],
        // [4250, 400],
        [4300, 325],
        // [4300, 400],
        [4350, 315],
        // [4350, 390],
        [4400, 295],
        [4400, 370],
        [4450, 275],
        [4450, 350],
        [4500, 255],
        [4500, 330],
        [4550, 255],
        [4550, 330],
        [4600, 260],
        [4600, 335],
        [4650, 280],
        [4650, 355],
        [4700, 275],
        [4700, 350],
        [4750, 255],
        [4750, 330],
        [4800, 235],
        [4800, 310],
        [4850, 230],
        [4850, 305],
        [4900, 240],
        [4900, 315],
        [4950, 250],
        [4950, 325],
        [5000, 250],
        [5000, 325],
        [5050, 220],
        [5050, 365],
        [5100, 220],
        [5100, 365],
        [5150, 220],
        [5150, 365],
        [5200, 220],
        [5200, 365],
        [5250, 230],
        [5250, 355],
        [5300, 240],
        [5300, 345],
        [5350, 250],
        [5350, 335],
        [5400, 255],
        [5400, 330],
        [5450, 255],
        [5450, 330],
        [5500, 260],
        [5500, 335],
        [5550, 260],
        [5550, 335],
        [5600, 260],
        [5600, 335],
        [5650, 250],
        [5650, 325],
        [5700, 250],
        [5700, 325],
        [5750, 260],
        [5750, 315],
        [5800, 265],
        [5800, 310],
        [5850, 265],
        [5850, 310],
        // fin du chemin
        [getRandomIntInclusive(6000, 6200), 349],
        [getRandomIntInclusive(6100, 6300), 231],
        [getRandomIntInclusive(6100, 6300), 244],
        [getRandomIntInclusive(6600, 6800), 272],
        [getRandomIntInclusive(6800, 6900), 326],
    ];

    meatballs.forEach(meatball => obstacles.create(meatball[0], meatball[1], "meatball"));

    const logs = [
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
        [6100, getRandomIntInclusive(235, 345)],
        [6450, getRandomIntInclusive(235, 345)],
        [7000, getRandomIntInclusive(235, 345)],
    ];

    logs.forEach(log => obstacles.create(log[0], log[1], "log"));
}