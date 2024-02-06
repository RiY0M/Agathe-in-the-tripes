// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

function create()
{
    //*Barre de vie *//
    graphics = this.add.graphics().setDepth(3);
    setHealthBar(bossHealth);

    //* Theme de fond *//
    startBackgroundMusic(this);
    
    //$ FOND DU BACKGROUND $//
    let bg = this.physics.add.staticGroup();
    bg.create(400, 75, "back-map").setDepth(0);
    bg.create(400, 440, "front-map").setScale(1.3).setDepth(2);

    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);

    //~ SPRITE AGATHE ~//
    boss = new Boss(this, 400, 300);

    // initialize off-screen
    vomitball = new Vomitball(this, -100, -100).setDepth(4);
    leftLittleWorms = new LittleWorm(this, -100, -100).setScale(1.2).setDepth(4);
    rightLittleWorms = new LittleWorm(this, -100, -100).setScale(1.2).setDepth(4).setFlip(true, false);

    //* CREATION DE LA MAP *//
    createMap(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, roadBorder);
    this.physics.add.collider(agathe, vomitball, bossGetDamaged);
    this.physics.add.collider(agathe, leftLittleWorms, getDamaged);
    this.physics.add.collider(agathe, rightLittleWorms, getDamaged);
    
    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    createVerticalAnims(this);
    
    //? AFK ANIMS ?//
    createAFK(this);

    // Handle boss throwing a vomitball (replace this with your actual logic)
    boss.on('throwVomitball', (targetX, targetY) => {
        vomitball.throwVomitball(boss.x, boss.y - 200, agathe.x, agathe.y); // Set initial position to boss position
        // vomitball.throwVomitball(targetX, targetY); // Set initial position to boss position
    });

    //& RECUPERATION BOUTON SUMMON &//
    document.querySelector("#summonBtn").addEventListener("click", () => {
        summonLilWorms(agathe, this);
    });
}

function update(time, delta) {

    //& ACTIVATION ATTAQUE LIL-WORM SI AGATHE A COTE &//

    //& GAUCHE &//
    if (leftLittleWorms !== null) {
        if (agathe.x - leftLittleWorms.x <= 30 && agathe.x - leftLittleWorms.x >= 0) {
            leftLittleWorms.playAttackAnim();
        }
    }

    //& DROITE &//
    if (rightLittleWorms !== null) {
        if (rightLittleWorms.x - agathe.x <= 30 && rightLittleWorms.x - agathe.x >= 0) {
            rightLittleWorms.playAttackAnim();
        }
    }

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

function getDamaged()
{
    console.log("touché");

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

//& RANDOM SUMMON LITTLE-WORMS &//
function summonLilWorms(agathe, scene) {

    // si des vers existent déjà
    if (leftLittleWorms !== null && rightLittleWorms !== null) {
        // on les remballe sous terre
        leftLittleWorms.playInAnim();
        rightLittleWorms.playInAnim();
    }

    // nombre aléatoire entre 10 et 750 pour ver de gauche
    let leftX = Math.floor(Math.random() * (250 - 10 + 1)) + 10;
    // nombre aléatoire entre 650 et 790 pour ver de droite
    let rightX = Math.floor(Math.random() * (790 - 650 + 1)) + 650;
    
    // apparition ver de gauche
    leftLittleWorms = new LittleWorm(scene, leftX, 325).setScale(1.2).setDepth(3);
    // apparition ver de droite en miroir
    rightLittleWorms = new LittleWorm(scene, rightX, 325).setScale(1.2).setDepth(3).setFlip(true, false);

    //! COLLISIONS !//
    scene.physics.add.collider(agathe, leftLittleWorms, getDamaged);
    scene.physics.add.collider(agathe, rightLittleWorms, getDamaged);
}