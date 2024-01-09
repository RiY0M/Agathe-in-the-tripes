"use strict";

async function sendData(idLevel, idNextLevel, time, hp_remain = 3, getDynamite = false) {

    const json = await callAPI("saveScore", {
        level_id: idLevel,
        next_level_id: idNextLevel,
        complete_time: time,
        hp_remain: hp_remain,
        get_dynamite: getDynamite,
    });

    if (json.status == 'error') {
        console.log(json.message);
    }
    createCookiesFromData(json.data);
}

/**
 * Enregistrement du temps + passage au niveau suivant dans la bdd et change la page
 * A besoin des 3 variables globales suivantes
 * Date startTime : date à partir du moment où le niveau a commencé
 * int idCurrentLvl : id du niveau actuel
 * int idNextLvl : id du niveau suivant
 */
function changeLvl(idCurrentLvl, idNextLvl, startTime, hp_remain = 3, getDynamite = false) {

    // Calcul du temps
    const time = (new Date().getTime() - startTime) / 1000;
    // console.log(time);
    
    // Appel API
    sendData(idCurrentLvl, idNextLvl, time, hp_remain, getDynamite);

    // Changement map
    window.location.replace(`./lvl${idNextLvl}.html`);
}

function getCookies() {
    return {
        hpRemain: parseInt(getCookie("hp_remain")),
        nbDynamite: parseInt(getCookie("nb_dynamite")),
        idLvl: parseInt(getCookie("level_id")),
    };
}

function afficheInitialHearts(hpRemain) {
    document.querySelector(".heart-image").src = `../../../img/assets/common/${hpRemain}-heart.png`;
}

function verifyLvl(idLvlCookie, idCurrentLvl) {
    if (idLvlCookie != idCurrentLvl && idCurrentLvl != 0) {
        window.location.replace("../index.html");
    }
}

const cookies = getCookies();

verifyLvl(cookies.idLvl, idCurrentLvl);
afficheInitialHearts(cookies.hpRemain);