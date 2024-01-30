//~ SPRITE AGATHE ~//
function createAgathe(scene){
    agathe = scene.physics.add.sprite(15, 320, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
    
    agathe.setCollideWorldBounds(true); // on définit les collisions avec la bordure
}

//~ SPRITE BOSS ~//
function createBoss(scene){
    boss = scene.physics.add.staticGroup();
    boss = scene.physics.add.sprite(400, 320, "boss")
        .setSize(21, 8) 
        .setOffset(5, 40);
    
    boss.setCollideWorldBounds(true); // on définit les collisions avec la bordure
}

//~ SPRITE VOMITBALL ~//
function createVomitball(scene){
    vomitball = scene.physics.add.sprite(400, 100, "vomitball");    
    vomitball.setCollideWorldBounds(true); // on définit les collisions avec la bordure

    createVomitballAnim(scene);
    vomitball.anims.play("vomitball", true);
}

//* CREATION DE LA MAP *//
function createMap(scene){
    // ajout de la route invisible
    roadBorder.create(400, 353, "road").setVisible(false);
}

//* Créer et gère les PV de barre de vie *//
function setHealthBar(value){   //Fonction qui s'occupe de la barre de vie du boss
    width_bar = 700; //Taille bar de vie
    percent_bar = Phaser.Math.Clamp(value, 0, 20) / 20; //Nb de pv : Ici de 0 -> 100

    graphics.clear();
    graphics.fillStyle(0x808080);
    graphics.fillRoundedRect(10, 10, width_bar, 20, 5);

    if (percent_bar > 0){
        graphics.fillStyle(0x00ff00);
        graphics.fillRoundedRect(10, 10, width_bar * percent_bar, 20, 5)
    }

}