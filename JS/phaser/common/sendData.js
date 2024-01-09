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
async function changeLvl(idCurrentLvl, idNextLvl, startTime, hp_remain = null, getDynamite = false) {

    game.destroy()
    // Calcul du temps
    const time = (new Date().getTime() - startTime) / 1000;
    // console.log(time);
    
    if(!hp_remain) hp_remain = getCookie("hpRemain");
    // Appel API
    await sendData(idCurrentLvl, idNextLvl, time, hp_remain, getDynamite);

    // Changement map
    window.location.replace(`./lvl${idNextLvl}.html`);
}

function getCookies() {
    const hpRemain = getCookie("hpRemain");
    const nbDynamite = getCookie("nbDynamite");
    const idLvl = getCookie("level_id");

    return {
        hpRemain: hpRemain ? parseInt(hpRemain) : 3,
        nbDynamite: nbDynamite ? parseInt(nbDynamite) : 0,
        idLvl: idLvl ? parseInt(idLvl) : 0,
    };
}

function afficheInitialHearts(hpRemain = 3) {
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