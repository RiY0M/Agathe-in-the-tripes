
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}


function createGround(scene){
    sol = scene.physics.add.staticGroup();
    sol.create(400, 300, "ground");
}

function createBorderTopBottom(scene){
    borderTopBottom = scene.physics.add.staticGroup();
    borderTopBottom.create(400, 10, "borderTopBottm");
    borderTopBottom.create(400, 590, "borderTopBottm");
}