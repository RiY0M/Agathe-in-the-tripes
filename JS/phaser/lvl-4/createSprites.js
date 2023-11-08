
//~ SPRITE AGATHE ~//
function createAgathe(scene)
{
    // ajout d'agathe à la fenêtre
    agathe = scene.physics.add.sprite(10, 300, "agathe")
        .setSize(21, 8)
        .setOffset(5, 40);
}


function setupCollisions(scene) {
    const map = scene.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });

    // Créez des couches pour le sol et les murs
    const solLayer = map.getLayer('Sol');
    const mursLayer = map.getLayer('Murs');

    // Activer les collisions pour la couche des murs en utilisant l'intervalle correct
    map.setCollisionBetween(1, 337, true, 'Murs');

    // Configurer les collisions avec le joueur (agathe)
    scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    // Activer les collisions avec la couche du sol (pour éviter les passages à travers le sol)
    scene.physics.add.collider(agathe, solLayer);

    // Désactiver la collision entre le sol et les murs (pour permettre à l'utilisateur de se déplacer librement sur le sol)
    map.setCollisionBetween(1, 337, false, 'Sol');
}

