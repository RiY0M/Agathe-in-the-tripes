"use strict";

//Fonction qui supprime tous les cookies existants
function supprimeTousLesCookies() {
    document.cookie.split(";").forEach(cookie => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
}

function getCookie(name) {
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}

async function callAPI(fichierApi, basic, bjsonDataPostasic = {}) {

    try {
        jsonDataPost.token = getCookie("token");

        const response = await fetch(`https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/${fichierApi}.php`, {
            method: 'POST',
            body: new URLSearchParams(jsonDataPost)
        });

        return await response.json();
    } catch(error) {
        return basic;
    }
}

function createCookiesFromData(data) {
    Object.entries(data).forEach(element => {
        document.cookie = `${element[0]}=${element[1]}; expires=Thu, ${new Date().getTime() + 86400 * 365}; path=/`;
    });
}