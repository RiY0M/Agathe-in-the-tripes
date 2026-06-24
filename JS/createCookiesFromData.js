"use strict";

//Fonction qui supprime tous les cookies existants
export function deleteAllCookies() {
    document.cookie.split(";").forEach(cookie => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
}

export function getCookie(name) {
    return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`))?.split("=")[1];
}

export async function callAPI(endpoint, defaultReturn, data = {}) {

    try {
        data.token = getCookie("token");

        const response = await fetch(`https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/${endpoint}.php`, {
            method: 'POST',
            body: JSON.stringify(data)
        });

        return await response.json();
    } catch(error) {
        return {
            status: "success",
            data: defaultReturn
        };
    }
}

export function createCookiesFromData(data) {
    const cookieLife = 86400 * 365;
    const timeout = new Date().getTime() + cookieLife;

    Object.entries(data).forEach(element => {
        document.cookie = `${element[0]}=${element[1]}; expires=Thu, ${timeout}; path=/`;
    });
}
