
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
    platforms.create(450, 420, "platforms");
    platforms.create(200, 320, "platforms");

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