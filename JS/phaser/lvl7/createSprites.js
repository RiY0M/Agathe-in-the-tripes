//~ SPRITE AGATHE ~//
function createAgathe(scene){
    agathe = scene.physics.add.sprite(15, 320, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    
    agathe.setCollideWorldBounds(true); // on définit les collisions avec la bordure
}

//~ SPRITE Boss ~//
function createBoss(scene){
    boss = scene.physics.add.sprite(400, 320, "boss")
        .setSize(21, 8)
        .setOffset(5, 40);
    
    boss.setCollideWorldBounds(true); // on définit les collisions avec la bordure
}

//* CREATION DE LA MAP *//
function createMap(scene){
    // ajout de la route invisible
    roadBorder.create(400, 353, "road").setVisible(false);
}