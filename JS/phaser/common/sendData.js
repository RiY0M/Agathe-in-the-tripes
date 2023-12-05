"use strict";

function sendData(idLevel, idNextLevel, time, hp_remain = null) {

    fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/saveScore.php', {
        method: 'POST',
        body: new URLSearchParams({
            level_id: idLevel,
            next_level_id: idNextLevel,
            complete_time: time,
            hp_remain: hp_remain,
        }),
    })
    .then(response => response.json())
    .then(json => {
        if (json.status == 'error') {
            console.log(json.message);
        }
    });
}