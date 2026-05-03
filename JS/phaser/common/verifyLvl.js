"use strict";

function getCookies() {
    const hpRemaining = getCookie("hpRemaining");
    const nbDynamite = getCookie("nbDynamite");
    const levelId = getCookie("levelId");

    return {
        hpRemaining: hpRemaining ? parseInt(hpRemaining) : 3,
        nbDynamite: nbDynamite ? parseInt(nbDynamite) : 0,
        idLvl: levelId ? parseInt(levelId) : 0,
    };
}

function verifyLvl(idLvlCookie, idCurrentLvl) {
    if (idLvlCookie != idCurrentLvl) {
        window.location.replace("../index.html");
    }
}

const cookies = getCookies();
let nbHearts = cookies.hpRemaining;
let idCurrentLvl = 0;

verifyLvl(cookies.idLvl, idCurrentLvl);
