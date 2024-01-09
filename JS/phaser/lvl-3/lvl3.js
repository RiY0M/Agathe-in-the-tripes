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
    music.setLoop(true);
    music.play();

    //* MAP *//
    tilemap(this);

    //* SPRITE COEUR DU SQUELETTE *//
    createSquelettonHeart(this);

    //~ SPRITE AGATHE ~//
    createAgathe(this);

    //*Murs*//
    createWalls(this);

    //! COLLISIONS !//
    this.physics.add.collider(agathe, platforms);
    this.physics.add.collider(agathe, wall);

    //! DETECTION DU CLAVIER !//
    cursors = this.input.keyboard.createCursorKeys();

    //! ACTION RECUP COEUR !//
    this.physics.add.overlap(agathe, squelettonHeart, collectSquelettonHeart, null, this);

    //^ ANIMATIONS AGATHE (SPRITES) ^//

    //? MOVING ANIMS ?//
    anims(this);    //Animation unique a ce niveau
    
    //? AFK ANIMS ?//
    createAFK(this);   
    
    //? Caméra ?//
    this.cameras.main.setBounds(0, 0, 800, 3200);
    this.cameras.main.startFollow(agathe, true, 0.5, 0.5);

    //* Nuage de Poison *//
    this.poison = this.add.graphics(); // Ajout du poison
    
}

function update(){

    if (cursors.left.isDown)
    {
        agathe.setVelocityX(-160);
        hasMoved = true;
        agathe.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        agathe.setVelocityX(160);
        hasMoved = true;
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
        
        if (agathe.y <= 105) //console.log("next lv");               
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

    if (hasMoved){  //Lance le poison des que le joueur a bougé.
        this.poison.clear();

        //this.poison.fillStyle(0x2d2d2d); // Couleur du poison
        // Ajustement de la position du poison pour commencer du bas
        let poisonY = 3200 - (size_poison * Vitesse_de_poison);
        let poisonHeight = size_poison * Vitesse_de_poison;
        this.poison.fillRect(0, poisonY, 800, poisonHeight); // Taille du poison
    
        this.poison.fillStyle(0x2dff2d); // Couleur de barre remplie
    
        if (Vitesse_de_poison < 1) {
            Vitesse_de_poison += augmentation_poison; // Vitesse de poison
        }
        // Ajustement de la hauteur de la barre remplie pour correspondre à l'inversion du poison
        let filledHeight = size_poison * Vitesse_de_poison;

        if (filledHeight >= 400) augmentation_poison = 0.0005;


        this.poison.fillRect(0, 3200 - filledHeight, 800, filledHeight); // Poison de la barre

        //console.log("Remplie poison:",filledHeight);

        if (agathe.y >= 3200 - filledHeight - (agathe.height/2) ){
            collidePoison();
            agathe.setVelocityY(-800);

        }
    }

    // vérification de notre vie
    if (nbHearts == 0) displayDeathScreen();

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

function collectSquelettonHeart(agathe, squelettonHeart) {

    // suppression du coeur du squelette
    squelettonHeart.disableBody(true, true);

    // si agathe n'a pas toutes ses vies
    if (nbHearts < 3) {
        // on lui en rajoute une
        nbHearts++;
        reloadNbHearts();
    }
}