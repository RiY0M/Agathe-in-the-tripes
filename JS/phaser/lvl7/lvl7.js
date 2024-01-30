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

    //* Theme de fond *//
    startBackgroundMusic(this);
    //restartMusic = 16;

    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);  
    
    //~ SPRITE BOSS ~//
    createBoss(this);

    //~ SPRITE VOMITBALL ~//
    createVomitball(this);    

    //* CREATION DE LA MAP *//
    createMap(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, roadBorder);
    this.physics.add.collider(boss, roadBorder);

    //* Test dégats *//
    this.physics.add.collider(agathe, boss, bossGetDamaged);   // PERMET DE TEST DEGATS
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createVerticalAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);   

}

function update(){

    if (nbHearts == 0) displayDeathScreen();        //Personnage mort

    if (start3sCoolDownAgathe) {

        if (invicibilityAgathe == 150) {
            // sound-effect
            music = this.sound.add("damage");
            music.play();
        }

        // on lance la décrémentation des 150 frames (150 frames = 3s)
        invicibilityAgathe--;
        // on rend agathe invincible
        isInvicible = true;
    }

    // si les 3s d'invincibilité sont écoulées
    if (invicibilityAgathe == 0) {
        // on enlève l'effet d'immortalité à agathe
        isInvicible = false;
        // on arrête le chorno
        start3sCoolDownAgathe = false;
        // on réinitialise le compteur de frames
        invicibilityAgathe = 150;
    }

    // boucle en fonction du timer de l'invincibilité allant de 0.0 à 4.9
    let timer = invicibilityAgathe / 10 % 5;
    
    // la moitié du temps on passe en rouge
    if ((timer >= 0 && timer <= 1.25) || (timer >= 2.5 && timer <= 3.75)) agathe.setTint(0xFFFFFF);
    else agathe.setTint(0xFF0000);

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
        start3sCoolDownAgathe = true;
    }
}

function bossGetDamaged() {
    if (!isInvicibleBoss) {
        if (bossHealth >= 1) {
            bossHealth -= 1; // Réduire la santé du boss
            setHealthBar(bossHealth);

            // Faire clignoter le boss en rouge
            boss.setTint(0xFF0000);

            isInvicibleBoss = true;
            setTimeout(() => {
                // Arrêter le clignotement et revenir a la couleur normale
                boss.clearTint();
                isInvicibleBoss = false;
            }, 1000); // 3s invincible
        } else {
            console.log("Il est mort !");
        }
    }
}

function startBackgroundMusic(scene) {
    music = scene.sound.add("theme");
    music.volume -= 0.5;
    music.setLoop(true);

    if (isFirstTime) {
        isFirstTime = false;
        music.play();
    } else {
        music.play({
            seek: restartMusic
        });
    }
}