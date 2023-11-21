"use strict";

function sendData(idLevel, idNextLevel, time) {

    fetch('https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/API/saveScore.php', {
        method: 'POST',
        body: new URLSearchParams({
            level_id: idLevel,
            next_level_id: idNextLevel,
            complete_time: time
        }),
    })
    .then(response => response.json())
    .then(json => {
        if (json.status == 'error') {
            console.log(json.message);
        }
    });
}