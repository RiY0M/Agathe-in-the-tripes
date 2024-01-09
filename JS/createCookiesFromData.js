"use strict";

function getCookie(name) {
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}

async function callAPI(fichierApi, jsonDataPost = {}) {

    jsonDataPost.token = getCookie("token");

    const response = await fetch(`https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/${fichierApi}.php`, {
        method: 'POST',
        body: new URLSearchParams(jsonDataPost)
    });

    return await response.json();
}

function createCookiesFromData(data) {
    Object.entries(data).forEach(element => {
        document.cookie = `${element[0]}=${element[1]}; expires=Thu, ${new Date().getTime() + 86400 * 365}; path=/`;
    });
}