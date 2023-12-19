"use strict";

const loginForm = document.getElementById('loginFormulaire');
const registerForm = document.getElementById('registerFormulaire');
const msgErreurLog = document.querySelector("#loginSpanErreur");
const msgErreurReg = document.querySelector("#RegisterSpanErreur");

//fonction register
async function register(login, mdp) {

    const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/newUser.php', {
        method: 'POST',
        body: new URLSearchParams({
            login: login,
            mdp: mdp,
        }),
    });
    const json = await response.json();
    const data = json.data;
    console.log(data);
    if (json.status == 'success') {
        // L'Authentification a réussi
        const msgErreur = await connectUser(login, mdp);

        if(msgErreur) messageErreur(msgErreur, msgErreurReg);
    }
    messageErreur(json.message, msgErreurReg);
}

async function connectUser(login, mdp) {
    try {
        const response = await fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/connexion.php', {
            method: 'POST',
            body: new URLSearchParams({
                login: login,
                mdp: mdp,
            })
        });

        const json = await response.json();

        if (json.status !== "success") {
            console.log(json.message);
            return json.message;
        }

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


// let testtest = connectUser("rdm", "d");
// console.log(testtest);

// let testRegg = register("rdm", "tttt");
// console.log("Reg : ", testtest);