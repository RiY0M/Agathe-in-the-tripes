"use strict";

//? AFK ANIMS ?//
function createAFK(scene)
{
    // gauche
    scene.anims.create({
        key: "afk-4",
        frames: [ { key: "agathe", frame: 4 } ],
        frameRate: 20
    });

    // droite
    scene.anims.create({
        key: "afk-8",
        frames: [ { key: "agathe", frame: 8 } ],
        frameRate: 20
    });

    // haut
    scene.anims.create({
        key: "afk-12",
        frames: [ { key: "agathe", frame: 12 } ],
        frameRate: 20
    });

    // bas
    scene.anims.create({
        key: "afk-0",
        frames: [ { key: "agathe", frame: 0 } ],
        frameRate: 20
    });
}