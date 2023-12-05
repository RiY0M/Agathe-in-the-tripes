"use strict";

const loginForm = document.getElementById('loginFormulaire');
const registerForm = document.getElementById('registerFormulaire');
const msgErreurLog = document.querySelector("#loginSpanErreur");
const msgErreurReg = document.querySelector("#RegisterSpanErreur");

//fonction register
function register(login, mdp) {

    fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/newUser.php', {
        method: 'POST',
        body: new URLSearchParams({
            login: login,
            mdp: mdp,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status == 'success') {
            // L'Authentification a réussi
            const msgErreur = connectUser(login, mdp);

            if(msgErreur) messageErreur(msgErreur, msgErreurReg);
        }
        messageErreur(data.message, msgErreurReg);
    })
}

function connectUser(login, mdp) {
    fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/connexion.php', {
        method: 'POST',
        body: new URLSearchParams({
            login: login,
            mdp: mdp,
        })
    }).then(response => response.json()).then(json => {

        if(json.status != "success") {
            return json.message;
        }

        window.location.replace("index.html");
        return "";
    });
}

///////////////////////// LOGIN /////////////////////////

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    //console.log("LOGIN FORM");

    const loginLog = document.querySelector('#loginLog').value;
    const passwordLog = document.querySelector('#loginMdp').value;

    const msgErreur = connectUser(loginLog, passwordLog);

    if(msgErreur) messageErreur(msgErreur, msgErreurLog);
});

///////////////////////// REGISTER ////////////////////////

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const login = document.querySelector('#registerLog').value;
    const password = document.querySelector('#registerMdp').value;
    const passwordConfirm = document.querySelector('#registerMdpVerif').value;

    if (password === passwordConfirm) register(login, password);
    else messageErreur("Les mots de passes ne correspondent pas", msgErreurReg);
    
});

function messageErreur(msg, spanMsgErreur) {
    spanMsgErreur.style.color = "red";
    spanMsgErreur.innerHTML = msg;
    setTimeout(() => {
        spanMsgErreur.innerHTML = "";
    }, 7000);
}
