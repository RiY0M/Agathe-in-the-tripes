// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.CANVAS,
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
        update: update,
    }
};


//$ CREATION FENETRE PHASER $//
let game = new Phaser.Game(config);

function preload(){
    loadImages(this);
}

function create()
{
    //* Barre de vie *//
    graphics = this.add.graphics().setDepth(5);
    
    //* Theme de fond *//
    startBackgroundMusic(this);
    bossDmgSound = this.sound.add("bossDamage");
    
    //$ FOND DU BACKGROUND $//
    let bg = this.physics.add.staticGroup();
    bg.create(400, 75, "back-map").setDepth(0);
    bg.create(400, 297, "front-map-back").setScale(1.25).setDepth(2);
    bg.create(400, 480, "front-map-front").setScale(1.25).setDepth(4);
    
    //$ CHARGEMENT VARIABLES DE SPRITES $//
    loadSpriteVariables(this);
    
    //~ SPRITE AGATHE ~//
    createAgathe(this);

    
    //~ SPRITE BOSS ~//
    boss = new Boss(this, 400, 300).setDepth(1);
    vomitball = new Vomitball(this, -100, -100).setDepth(6); // Initialize off-screen  
    vomitshard = new Vomitshard(this, -100, -100).setDepth(6);

    // Ajoutez les gestionnaires d'événements pour activer/désactiver les collisions
    boss.on('bossReachedBottom', () => {
        this.physics.add.overlap(agathe, boss, getDamaged).name = 'boss_colider';
    });

    boss.on('bossReachedTop', () => {
        if (this.physics.world.colliders.getActive().find(i => i.name === 'boss_colider'))
            this.physics.world.colliders.getActive().find(i => i.name === 'boss_colider').destroy();
    });


    //& LITTLE-WORMS INITIALIZATION &//
    leftLittleWorms = new LittleWorm(this, -100, -100).setScale(1.2).setDepth(6);
    rightLittleWorms = new LittleWorm(this, -100, -100).setScale(1.2).setDepth(6).setFlip(true, false);


    //* CREATION DE LA MAP *//
    createMap(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, roadBorder);
    this.physics.add.overlap(agathe, vomitball, bossGetDamaged);
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
    boss.on('throwVomitball', () => {
        music = this.sound.add("fireball");
        music.play();
        vomitball.throwVomitball(boss.x, boss.headY, agathe.x, agathe.y); // Set initial position to boss position
    });
    vomitball.on('spawnVomitShard', () => {
        vomitshard.spawnVomitShard(vomitball.x, vomitball.y, boss.x, boss.headY); // Set initial position to boss position
    });
    boss.on('hideAndReappearEvent', (speed) => {
        music = this.sound.add("dirt");
        music.play();
        boss.hideAndReappear(speed);
    });

    //& RECUPERATION BOUTON SUMMON &//
    document.querySelector("#summonBtn").addEventListener("click", () => {
        music = this.sound.add("little-worm");
        music.play();
        summonLilWorms(agathe, this);
    });
}

function update(time, delta) {

    //& ACTIVATION ATTAQUE LIL-WORM SI AGATHE A COTE &//

    //& GAUCHE &//
    if (leftLittleWorms !== null) {
        if (agathe.x - leftLittleWorms.x <= 40 && agathe.x - leftLittleWorms.x >= 0 && okForLeftWormAnim) {
            leftLittleWorms.playAttackAnim();
        }
    }

    //& DROITE &//
    if (rightLittleWorms !== null) {
        if (rightLittleWorms.x - agathe.x <= 40 && rightLittleWorms.x - agathe.x >= 0 && okForRightWormAnim) {
            rightLittleWorms.playAttackAnim();
        }
    }

    if (nbHearts == 0) displayDeathScreen(); // Personnage mort

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
    vomitball.body.enable = false;
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

function bossGetDamaged(scene) {
    if (boss.isInvicible) {
        return;
    }
    if (boss.health < 1 && nbHearts > 0) {
        // changeLvl(idCurrentLvl, idNextLvl, startTime);
        console.log("Il est mort !");
        return;
    }

    boss.setHealth(boss.health - 1);
    bossDmgSound.play();

    if (boss.health % 2 == 1) {
        boss.emit('hideAndReappearEvent', 3);
    }

    // Faire clignoter le boss en rouge
    boss.setTint(0xFF0000);

    boss.isInvicible = true;
    setTimeout(() => {
        // Arrêter le clignotement et revenir a la couleur normale
        boss.clearTint();
        boss.isInvicible = false;
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
    leftLittleWorms = new LittleWorm(scene, leftX, 325).setScale(1.2).setDepth(6);
    // apparition ver de droite en miroir
    rightLittleWorms = new LittleWorm(scene, rightX, 325).setScale(1.2).setDepth(6).setFlip(true, false);

    // on permet à nouveau l'attaque des vers
    okForLeftWormAnim = true;
    okForRightWormAnim = true;

    //! COLLISIONS !//
    scene.physics.add.collider(agathe, leftLittleWorms, getleftLilWormDamage, null, this);
    scene.physics.add.collider(agathe, rightLittleWorms, getRightLilWormDamage, null, this);
}


//! COLLISION LITTLE-WORM !//
//& GAUCHE &//
function getleftLilWormDamage(player, worm)
{
    // prise de dégât
    getDamaged();

    // si on est derrière le monstre de gauche
    if (agathe.x <= worm.x) {
        // destruction immédiate
        worm.playInAnim();
        // suppression physique
        worm.body.enable = false;
    }
    // sinon on attend la fin d'animation
    else {
        // suppression animation attaque
        okForLeftWormAnim = false;
        worm.anims.stop();

        // destruction monstre
        worm.playInAnim();

        // suppression physique
        worm.body.enable = false;
    }
}

//& DROITE &//
function getRightLilWormDamage(player, worm)
{    
    // prise de dégât
    getDamaged();
    
    // si on est derrière le monstre de gauche
    if (agathe.x >= worm.x) {
        // destruction immédiate
        worm.playInAnim();
        // suppression physique
        worm.body.enable = false;
    }
    // sinon on attend la fin d'animation
    else {
        // suppression animation attaque
        okForRightWormAnim = false;
        worm.anims.stop();

        // destruction monstre
        worm.playInAnim();

        // suppression physique
        worm.body.enable = false;
    }
}