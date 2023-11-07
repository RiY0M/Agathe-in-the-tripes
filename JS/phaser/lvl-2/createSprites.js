
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    // on définit les collisions avec la bordure
    agathe.setCollideWorldBounds(true);
}


//* SPRITE BORDURE DU HAUT *//
function createBorders(scene)
{
    // affichage bordure depuis (0;0)
    borders = scene.physics.add.staticGroup();
    // bordures permettant d'accéder uniquement à la grotte
    borders.create(325, 70, "border-0");
    borders.create(325, 210, "border-0");
}


//* SPRITE GROTTE *//
function createCave(scene)
{
    // affichage grotte en haut à droite
    cave = scene.physics.add.staticGroup();
    cave.create(728, 50, "cave");
}


//* SPRITES ARBRES HAUT *//
function createTopTrees(scene)
{
    // groupement d'arbres
    trees = scene.physics.add.group();

	for (let i = 0; i < 650; i += 50)
    {
		let x = Phaser.Math.RND.between(0, 50);
        let y = Phaser.Math.RND.between(0, 10);

		trees.create(i + x, 50 + y, "tree-" + Phaser.Math.RND.between(0, 3));
	}

    // arbre cacher gauche grotte
    trees.create(675, 55, "tree-3");
}


//* SPRITES ARBRES MIDDLE *//
function createMiddleTrees()
{
    trees.create(310, 190, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(105, 290, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(575, 390, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(725, 320, "tree-" + Phaser.Math.RND.between(0, 3));
    trees.create(350, 385, "tree-" + Phaser.Math.RND.between(0, 3));
}


//* SPRITES ARBRES BAS *//
function createBottomTrees()
{
    for (let i = 0; i < 800; i += 50)
    {
		let x = Phaser.Math.RND.between(0, 50);
        let y = Phaser.Math.RND.between(0, 10);

		trees.create(i + x, 550 + y, "tree-" + Phaser.Math.RND.between(0, 3));
	}
}


//* SPRITE LAMPE *//
function createLamp(scene)
{
    lamp = scene.physics.add.group({
        key: "lampe",
        repeat: 0,
        setXY: {x: 90, y: 155}
    });
}


//* SPRITES CAILLOUX *//
function createRocks(scene)
{
    // groupement de cailloux
    rocks = scene.physics.add.staticGroup();

    // grossses pierres
    rocks.create(50, 150, "rock-3");
    rocks.create(75, 350, "rock-3");
    rocks.create(100, 200, "rock-3");
    rocks.create(30, 500, "rock-3");
    rocks.create(270, 500, "rock-3");
    rocks.create(320, 425, "rock-3");
    rocks.create(270, 125, "rock-3");
    rocks.create(430, 290, "rock-3");
    rocks.create(465, 215, "rock-3");
    rocks.create(600, 455, "rock-3");
    rocks.create(740, 400, "rock-3");
    rocks.create(695, 335, "rock-3");
    rocks.create(650, 145, "rock-3");

    // double-pierre
    rocks.create(65, 190, "rock-2");
    rocks.create(115, 370, "rock-2");
    rocks.create(670, 300, "rock-2");
    rocks.create(690, 150, "rock-2");

    // cailloux pointu neige
    rocks.create(230, 110, "rock-0");
    rocks.create(115, 440, "rock-0");
    rocks.create(430, 195, "rock-0");
    rocks.create(285, 235, "rock-0");
    rocks.create(310, 255, "rock-0");
    rocks.create(315, 500, "rock-0");
    rocks.create(785, 95, "rock-0");
    rocks.create(550, 425, "rock-0");

    // petit cailloux
    rocks.create(115, 345, "rock-1");
    rocks.create(285, 275, "rock-1");
    rocks.create(230, 135, "rock-1");
    rocks.create(160, 310, "rock-1");
    rocks.create(400, 415, "rock-1");
    rocks.create(565, 445, "rock-1");
    rocks.create(535, 460, "rock-1");
    rocks.create(775, 115, "rock-1");
    rocks.create(660, 325, "rock-1");
    rocks.create(350, 445, "rock-1");
}


//* PARTICULES DE NEIGE BLANCHE *//
function createWhiteParticles(scene)
{
    const whiteParticles = scene.add.particles("white-snowflake");
    whiteParticles.createEmitter({

        // zone émission
        emitZone: {
            source: new Phaser.Geom.Line(0, 0, 800, 0),
            type: "random",
            quantity: 150
        },

        // vitesse
        speedX: {min: -20, max: 20},
        speedY: {min: 40, max: 70},
        accelerationY: {random: [10, 15]},

        // durée de vie
        lifespan: {min: 8000, max: 10000},

        // taille
        scale: {random: [0.1, 0.5]},

        gravityY: 10,
        frequency: 30,
    });
}


//* PARTICULES DE NEIGE BLEUE *//
function createBlueParticles(scene)
{
    const blueParticles = scene.add.particles("blue-snowflake");
    blueParticles.createEmitter({

        // zone émission
        emitZone: {
            source: new Phaser.Geom.Line(0, 0, 800, 0),
            type: "random",
            quantity: 50
        },

        // vitesse
        speedX: {min: -20, max: 20},
        speedY: {min: 40, max: 60},
        accelerationY: {random: [10, 15]},

        // durée de vie
        lifespan: {min: 8000, max: 10000},

        // taille
        scale: {random: [0.1, 0.5]},

        gravityY: 10,
        frequency: 10,
    });
}