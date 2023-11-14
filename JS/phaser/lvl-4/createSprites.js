
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}


function createGround(scene){   //Créer le sol
    sol = scene.physics.add.staticGroup();
    sol.create(400, 300, "ground");
}

function createBorderTopBottom(scene){  //Créer les bordures du haut et du bas
    murHorizontale = scene.physics.add.staticGroup();
    borderTopBottom = scene.physics.add.staticGroup();

    borderTopBottom.create(400, 10, "borderTopBottom");
    borderTopBottom.create(400, 590, "borderTopBottom");
}

function createBorderLeftRight(scene){  //Créer les bordures de gauche et de droite
    murVerticale = scene.physics.add.staticGroup();

    for (i = 0; i < 600; i += 28){
        if (i!== 308 && i !== 588){
            murVerticale.create(10, i, "murVerticale");
            murVerticale.create(790, i, "murVerticale");
        }
    }
}

function getRandomNb(min = 10, max = 790) {
    return Math.random() * (max - min) + min;
}

function tacheDeSang(scene){    //Rajoute des taches de sang
    blood0 = scene.physics.add.staticGroup();
    blood1 = scene.physics.add.staticGroup();
    

    for (i = 0; i < 600; i += 60){
        getRandomNb() ? 
        
    }
}

function labyrinthe(scene){

}