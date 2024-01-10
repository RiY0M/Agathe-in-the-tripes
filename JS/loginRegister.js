"use strict";

const loginForm = document.getElementById('loginFormulaire');
const registerForm = document.getElementById('registerFormulaire');
const msgErreurLog = document.querySelector("#loginSpanErreur");
const msgErreurReg = document.querySelector("#RegisterSpanErreur");

//fonction register
async function register(login, mdp) {

    const json = await callAPI("newUser", {
        login: login,
        mdp: mdp,
    });

    const data = json.data;
    // console.log(data);
    if (json.status == 'success') {
        // L'Authentification a réussi
        const msgErreur = await connectUser(login, mdp);

        if(msgErreur) messageErreur(msgErreur, msgErreurReg);
    }
    messageErreur(json.message, msgErreurReg);
}

async function connectUser(login, mdp) {
    try {
        const json = await callAPI("connexion", {
            login: login,
            mdp: mdp,
        });

        if (json.status !== "success") {
            console.log(json.message);
            return json.message;
        }

        supprimeTousLesCookies();
        createCookiesFromData(json.data);

        window.location.replace("index.html");
        return "";
    } catch (error) {
        console.error("Error:", error);
        // Handle errors here
        return "An error occurred during login.";
    }
}

///////////////////////// LOGIN /////////////////////////

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    //console.log("LOGIN FORM");

    const loginLog = document.querySelector('#loginLog').value;
    const passwordLog = document.querySelector('#loginMdp').value;

    const msgErreur = await connectUser(loginLog, passwordLog);
    console.log("BLABLA : ",msgErreur);
    if(msgErreur) messageErreur(msgErreur, msgErreurLog);
});

///////////////////////// REGISTER ////////////////////////

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const login = document.querySelector('#registerLog').value;
    const password = document.querySelector('#registerMdp').value;
    const passwordConfirm = document.querySelector('#registerMdpVerif').value;

    if (password === passwordConfirm) await register(login, password);
    else messageErreur("Les mots de passes ne correspondent pas", msgErreurReg);
    
});

function messageErreur(msg, spanMsgErreur) {
    spanMsgErreur.style.color = "red";
    spanMsgErreur.innerHTML = msg;
    setTimeout(() => {
        spanMsgErreur.innerHTML = "";
    }, 7000);
}