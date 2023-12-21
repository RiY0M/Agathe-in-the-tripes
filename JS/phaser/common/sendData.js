"use strict";

async function sendData(idLevel, idNextLevel, time, hp_remain = null, getDynamite = false) {

    const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/saveScore.php', {
        method: 'POST',
        body: new URLSearchParams({
            level_id: idLevel,
            next_level_id: idNextLevel,
            complete_time: time,
            hp_remain: hp_remain,
            get_dynamite: getDynamite,
        }),
    });
    const json = response.json();
    if (json.status == 'error') {
        console.log(json.message);
    }
}

/**
 * Enregistrement du temps + passage au niveau suivant dans la bdd et change la page
 * A besoin des 3 variables globales suivantes
 * Date startTime : date à partir du moment où le niveau a commencé
 * int idCurrentLvl : id du niveau actuel
 * int idNextLvl : id du niveau suivant
 */
function changeLvl(idCurrentLvl, idNextLvl, startTime, hp_remain = null, getDynamite = false) {

    // Calcul du temps
    const time = (new Date().getTime() - startTime) / 1000;
    console.log(time);
    
    // Appel API
    sendData(idCurrentLvl, idNextLvl, time, hp_remain, getDynamite);

    // Changement map
    // window.alert("Changement de niveau !"); // debug
    window.location.replace(`./lvl${idNextLvl}.html`);
}