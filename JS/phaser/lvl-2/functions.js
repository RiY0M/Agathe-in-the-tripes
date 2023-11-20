"use strict";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveLevel(value) {

    backgrounds.forEach(background => background.x -= value);

    rocks.getChildren().forEach(rock => {
        rock.x -= value;
        // Update the hitbox position
        rock.refreshBody();
    });

    finNiv.getChildren().forEach(fin => {
        fin.x -= value;
        // Update the hitbox position
        fin.refreshBody();
    });

    xScroll += value;
}