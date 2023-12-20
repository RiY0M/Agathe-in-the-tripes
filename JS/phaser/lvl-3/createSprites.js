
//~ SPRITE AGATHE ~//
function createAgathe(scene){
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}

function createGround(scene){
    platforms = scene.physics.add.staticGroup();
    platforms.create(400, 568, 'platforms').setScale(5).refreshBody();

    // platforms.create(400, 350, "platforms");
    // platforms.create(450, 420, "platforms");
    // platforms.create(200, 320, "platforms");

    platforms.children.entries.forEach((platf) => {
        platf.body.checkCollision = {down: false, left: false, none: false, right: false, up: true};
        
    });
}

//Créer les nouvelles anims spéciale pour ce niveau
function anims(scene){
    scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('agathe', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [ { key: 'agathe', frame: 0 } ],
        frameRate: 20
    });

    scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('agathe', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
}


function tilemap(scene){
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
    scene.physics.add.collider(agathe, walls);
}