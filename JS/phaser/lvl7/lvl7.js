// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#e78c93",
    physics: { default: 'arcade',
                arcade : {
                    gravity: { y: 600 },
                    debug: false
                }

            },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// $ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);


function preload(){
    loadImages(this);
}

function create(){
    //*Barre de vie *//
    graphics = this.add.graphics();
    setHealthBar(bossHealth);

    //events.on('')


    //* Theme de fond *//
    music = this.sound.add("theme");
    music.volume -= 0.5;
    music.setLoop(true);
    music.play();

    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);  
    
    //~ SPRITE AGATHE ~//
    createBoss(this);    

    //* CREATION DE LA MAP *//
    createMap(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, roadBorder);
    this.physics.add.collider(boss, roadBorder);

    //* Test dégats *//
    this.physics.add.collider(agathe, boss, inflictDamage);   // A SUPPR
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createVerticalAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);   

}

function update(){

    if (nbHearts == 0) displayDeathScreen();

    if (start3sCoolDown) {

        if (invicibility == 150) {
            // sound-effect
            music = this.sound.add("damage");
            music.play();
        }

        // on lance la décrémentation des 150 frames (150 frames = 3s)
        invicibility--;
        // on rend agathe invincible
        isInvicible = true;
    }

    // si les 3s d'invincibilité sont écoulées
    if (invicibility == 0) {
        // on enlève l'effet d'immortalité à agathe
        isInvicible = false;
        // on arrête le chorno
        start3sCoolDown = false;
        // on réinitialise le compteur de frames
        invicibility = 150;
    }

    createVerticalMove(agathe, cursors);
}


function collidePlayerProjectile()
{
    // si agathe n'est pas invincible
    if (!isInvicible)
    {
        // si elle a encore au moins une vie
        if (nbHearts > 0) {
            // on lui en retire une
            nbHearts--;
            reloadNbHearts();
        }

        // lancement des 3s d'invincibilité
        start3sCoolDown = true;
    }
}


function setHealthBar(value){   //Fonction qui s'occupe de la barre de vie du boss
    width_bar = 700; //Taille bar de vie
    percent_bar = Phaser.Math.Clamp(value, 0, 100) / 100; //Nb de pv : Ici de 0 -> 100

    graphics.clear();
    graphics.fillStyle(0x808080);
    graphics.fillRoundedRect(10, 10, width_bar, 20, 5);

    if (percent_bar > 0){
        graphics.fillStyle(0x00ff00);
        graphics.fillRoundedRect(10, 10, width_bar * percent_bar, 20, 5)
    }

}

function inflictDamage() {
    
    bossHealth -= 15; // Réduire la santé du boss

    setHealthBar(bossHealth);

    console.log("Test");
    // if (bossHealth <= 0) {
    //     // Code à exécuter lorsque le boss est mort
    //     bossDeath();
    // }
}
