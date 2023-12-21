// configuration de la taille de l'écran, du type de jeu et des fonctions par défaut
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#b33015",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
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
    //$ ELEMENTS HTML $//
    loadImages(this);
}

function create(){
    //* Theme de fond *//
    music = this.sound.add("theme");
    music.play();

    //* MAP *//
    tilemap(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, platforms);

    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    anims(this);    //Animation unique a ce niveau
    
    //? AFK ANIMS ?//
    createAFK(this);   
    
    //? Caméra ?//
    this.cameras.main.setBounds(0, 0, 800, 3200);
    this.cameras.main.startFollow(agathe, true, 0.5, 0.5);

    
}

function update(){

    if (cursors.left.isDown)
    {
        agathe.setVelocityX(-160);

        agathe.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        agathe.setVelocityX(160);

        agathe.anims.play('right', true);
    }
    else
    {
        agathe.setVelocityX(0);

        agathe.anims.play('turn');
    }

    if (cursors.up.isDown && agathe.body.touching.down)
    {
        agathe.setVelocityY(-450);
        
        if (agathe.y <= 95) //console.log("next lv");               
        changeLvl(idCurrentLvl, idNextLvl, startTime);

    }

    // boucle en fonction du timer de l'invincibilité allant de 0.0 à 4.9
    let timer = invicibility / 10 % 5;
    
    // la moitié du temps on passe en rouge
    if ((timer >= 0 && timer <= 1.25) || (timer >= 2.5 && timer <= 3.75)) agathe.setTint(0xFFFFFF);
    else agathe.setTint(0xFF0000);

    if (start3sCoolDown) {
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
}

function collidePoison()
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

