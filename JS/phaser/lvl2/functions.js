"use strict";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveLevel(value) {

    backgrounds.forEach(background => background.x -= value);

    obstacles.getChildren().forEach(rock => {
        rock.x -= value;
        // Update the hitbox position
        rock.refreshBody();
    });

    heart.getChildren().forEach(coeur => {
        coeur.x -= value;
        coeur.refreshBody();
    });

    dynamite.getChildren().forEach(dyn => {
        dyn.x -= value;
        dyn.refreshBody();
    });

    finNiv.getChildren().forEach(fin => {
        fin.x -= value;
        fin.refreshBody();
    });

    xScroll += value;
}