"use strict";

import { callAPI, deleteAllCookies, createCookiesFromData } from "./createCookiesFromData.js";

const loginForm = document.getElementById('login');
const registerForm = document.getElementById('register');
const errorMsgLogin = document.getElementById("login-error");
const errorMsgReg = document.getElementById("register-error");

async function register(login, mdp) {

    const json = await callAPI("newUser", {
        error: "Not connected to db"
    },
    {
        login: login,
        mdp: mdp,
    });

    // console.log(json.data);
    if (json.status == 'success') {
        // L'Authentification a réussi
        const errorMsg = await connectUser(login, mdp);

        if(errorMsg) printErrorMessage(errorMsg, errorMsgReg);
    }
    printErrorMessage(json.message, errorMsgReg);
}

async function connectUser(login, mdp) {
    try {
        let json = await callAPI("connexion", {
            error: "Not connected to db"
        },
        {
            login: login,
            mdp: mdp,
        });

        if (json.status !== "success") {
            console.log(json.message);
            return json.message;
        }

        deleteAllCookies();
        createCookiesFromData(json.data);

        json = await callAPI("getGame", {
            levelId: 0,
            hpRemaining: 3,
            nbDynamite: 0
        });
        createCookiesFromData(json.data);

        window.location.replace("index.html");
        return "";
    } catch (error) {
        console.error("Error:", error);
        // Handle errors here
        return "An error occurred during login.";
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginLog = document.querySelector('#loginLog').value;
    const passwordLog = document.querySelector('#loginMdp').value;

    const msgErreur = await connectUser(loginLog, passwordLog);
    // console.log("BLABLA : ",msgErreur);
    if(msgErreur) printErrorMessage(msgErreur, errorMsgLogin);
});

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const login = document.querySelector('#registerLog').value;
    const password = document.querySelector('#registerMdp').value;
    const passwordConfirm = document.querySelector('#registerMdpVerif').value;

    if (password === passwordConfirm) await register(login, password);
    else printErrorMessage("Les mots de passe ne correspondent pas", errorMsgReg);
    
});

function printErrorMessage(msg, spanMsgErreur) {
    spanMsgErreur.innerHTML = msg;
    setTimeout(() => {
        spanMsgErreur.innerHTML = "";
    }, 7000);
}
