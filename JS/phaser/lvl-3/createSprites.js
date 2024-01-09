
//~ SPRITE AGATHE ~//
function createAgathe(scene){
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(400, 50, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40)
        .setBounce(0.2);
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
    platforms = scene.physics.add.staticGroup();
    map = scene.make.tilemap({ key: 'tilemap' });
    tileset = map.addTilesetImage('plateforme', 'tiles');

    map.forEachTile(tile => { 
        if (tile.index === 1) {
            const x = tile.getCenterX();
            const y = tile.getCenterY();
            platforms.create(x, y, 'tiles', tile.index); 
        }
    });
    platforms.children.entries.forEach((platf) => {
        platf.body.checkCollision = {down: false, left: false, none: false, right: false, up: true}; 
    });
}

function createWalls(scene) {
    wall = scene.physics.add.staticGroup();
    //wall.create(-10, 3100, "wall");
    for (let y = 3100; y >= 0; y -= 150) {
        wall.create(-18, y, "wall");
        wall.create(818, y, "wall");
    }
}

//* SPRITE COEUR DU SQUELETTE *//
function createSquelettonHeart(scene)
{
    // sang du coeur
    blood = scene.physics.add.staticGroup();
    blood.create(600, 100, "blood-1").setScale(0.5);

    // coeur du squelette
    squelettonHeart = scene.physics.add.staticGroup();
    squelettonHeart.create(600, 100, "squeletton-heart").setScale(0.7).angle += 25;
}