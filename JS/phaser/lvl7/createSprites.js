//~ SPRITE AGATHE ~//
function createAgathe(scene){
    agathe = scene.physics.add.sprite(15, 320, "agathe").setDepth(5)
        .setSize(21, 8)
        .setOffset(5, 40);
    
    agathe.setCollideWorldBounds(true); // on définit les collisions avec la bordure
}

//* CREATION DE LA MAP *//
function createMap(scene){
    // ajout de la route invisible
    roadBorder.create(400, 353, "road").setVisible(false);
}

//* Créer et gère les PV de barre de vie *//
function setHealthBar(value, maxHealth){   //Fonction qui s'occupe de la barre de vie du boss
    width_bar = 700; //Taille bar de vie
    percent_bar = Phaser.Math.Clamp(value, 0, maxHealth) / maxHealth; //Nb de pv : Ici de 0 -> 21

    const centerX = (config.width - width_bar) / 2;

    graphics.clear();
    graphics.fillStyle(0xff6600);
    graphics.fillRoundedRect(centerX, 550, width_bar, maxHealth, 5);

    if (percent_bar > 0){
        graphics.fillStyle(0xff0000);
        graphics.fillRoundedRect(centerX, 550, width_bar * percent_bar, maxHealth, 5)
    }
}