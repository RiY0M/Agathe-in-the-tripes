
//~ SPRITE AGATHE ~//
function createAgathe(scene){
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}

function getRandomNb(min = 10, max = 790) {
    return Math.random() * (max - min) + min;
}

function tacheDeSang(scene){    //Rajoute des taches de sang
    blood0 = scene.physics.add.staticGroup();
    blood1 = scene.physics.add.staticGroup();
    
    for (i = 0; i < 600; i += 40){
        getRandomNb(1, 1000) > 500 ? blood0.create(getRandomNb(), i, "blood0") : blood1.create(getRandomNb(), i, "blood1");
    }
}

function labyrinthe(scene) {   
    // Création de la tilemap 
    map = scene.make.tilemap({ key: 'tilemap' });
    tileset = map.addTilesetImage('world', 'tiles'); // Ajout du tileset à la tilemap

    // Création de la couche "Wall" de la tilemap
    const wallLayer = map.createStaticLayer("Wall", tileset);
    walls = scene.physics.add.staticGroup({ 
        // Donne aux tuiles de la couche "Wall" un corps physique pour la collision
        classType: Phaser.GameObjects.Sprite,
        defaultKey: 1, // Clé de tuile de Wall
        maxSize: -1,
    });

    map.forEachTile(tile => { // Parcours toutes les tuiles de la couche "Wall"
        if (tile.index === 1) {
            const x = tile.getCenterX();
            const y = tile.getCenterY();
            const wall = walls.create(x, y, 'tiles', tile.index); // Créer un mur à la position de la tuile
            wall.setOrigin(0.5, 0.5);
            wall.body.width = tile.width;
            wall.body.height = tile.height;
            wall.body.immovable = true; // Bloque Agathe
        }
    });
    walls.create(-15, 270, "tiles");    //Créer des murs invisibles pour bloquer Agathe
    walls.create(-15, 300, "tiles");
    walls.create(-15, 330, "tiles");
    walls.create(-15, 360, "tiles");
}


//* SPRITE COEUR DU SQUELETTE *//
function createSquelettonHeart(scene)
{
    // sang du coeur
    blood1.create(705, 190, "blood1").setScale(0.5);

    // coeur du squelette
    squelettonHeart = scene.physics.add.group();
    squelettonHeart.create(705, 190, "squeletton-heart").setScale(0.9).angle += 25;
}