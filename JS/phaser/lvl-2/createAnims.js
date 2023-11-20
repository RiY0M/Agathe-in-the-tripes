"use strict";

//? MOVING ANIMS ?//
function createAnims(scene)
{
    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers("agathe", { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers("agathe", { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "up",
        frames: scene.anims.generateFrameNumbers("agathe", { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "down",
        frames: scene.anims.generateFrameNumbers("agathe", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
}