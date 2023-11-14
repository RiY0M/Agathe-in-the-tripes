
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

    // Xmin 500
    // grossses pierres

    const rocks0 = [
        [500, 230],
        [500, 360],
        [513, 260],
    ];

    rocks0.forEach(rock0 => rocks.create(rock0[0], rock0[1], "rock-0"));

    const rocks1 = [
        [540, 270],
    ];

    rocks1.forEach(rock1 => rocks.create(rock1[0], rock1[1], "rock-1"));

    const rocks2 = [
        [540, 270],
    ];

    rocks2.forEach(rock2 => rocks.create(rock2[0], rock2[1], "rock-2"));

    const rocks3 = [
        [850, 350],
        [900, 300],
    ];

    rocks3.forEach(rock3 => rocks.create(rock3[0], rock3[1], "rock-3"));
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