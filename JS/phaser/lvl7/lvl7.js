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
    boss = new Boss(this, 400, 120);
    vomitball = new Vomitball(this, -100, -100); // Initialize off-screen

    //* CREATION DE LA MAP *//
    createMap(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, roadBorder);
    this.physics.add.collider(boss, roadBorder);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createVerticalAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);

    // Handle boss throwing a vomitball (replace this with your actual logic)
    boss.on('throwVomitball', (targetX, targetY) => {
        vomitball.throwVomitball(boss.x, boss.y, agathe.x, agathe.y); // Set initial position to boss position
        // vomitball.throwVomitball(targetX, targetY); // Set initial position to boss position
    });

    //* Test dégats *//
    this.physics.add.collider(agathe, boss, bossGetDamaged);   // PERMET DE TEST DEGATS
    this.physics.add.collider(agathe, vomitball, collidePlayerProjectile);   // PERMET DE TEST DEGATS
}

function update(time, delta) {

    if (nbHearts == 0) displayDeathScreen();        //Personnage mort

    boss.update(time, delta);
    vomitball.update(time, delta);

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
    if (isInvicible) {
        return;
    }
    // si elle a encore au moins une vie
    if (nbHearts > 0) {
        // on lui en retire une
        nbHearts--;
        reloadNbHearts();
    }

    // lancement des 3s d'invincibilité
    start3sCoolDownAgathe = true;
}

function bossGetDamaged() {
    if (isInvicibleBoss) {
        return;
    }
    if (bossHealth < 1) {
        console.log("Il est mort !");
        return;
    }

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
}