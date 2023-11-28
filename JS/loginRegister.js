"use strict";

const loginForm = document.getElementById('loginFormulaire');
const registerForm = document.getElementById('registerFormulaire');
const msgErreurLog = document.querySelector("#loginSpanErreur");
const msgErreurReg = document.querySelector("#RegisterSpanErreur");

//fonction register
function register(login, mdp) {

    fetch('https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/API/newUser.php', {
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

            messageErreur(msgErreur, msgErreurReg);
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
        }),
    }).then(response => response.json()).then(json => {

        console.log(json);
        if(json.status != "success") {
            return json.message;
        }
        // const token = json.data.token;
        // Cookies gérés en php
        // // supprCookies();
        // let date_expiration = new Date();
        // date_expiration.setTime(date_expiration.getTime() + (86400 * 365));
        // document.cookie = `token=${token};expires=${date_expiration};path=/`;
        // window.location.href = "index.html";
        return;
    });
}


// function supprCookies(){
//     let cookieString = document.cookie;
//     let cookies = cookieString.split("; ");
    
//     for (let i = 0; i < cookies.length; i++) {
//         const parts = cookies[i].split("=");
//         const name = decodeURIComponent(parts[0]);
    
//         const expires = new Date();
//         expires.setTime(expires.getTime() - 1);
    
//         document.cookie = `${name}=;expires=${expires.toUTCString()};path=/`;
//     }
// }

///////////////////////// LOGIN /////////////////////////

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    //console.log("LOGIN FORM");

    const loginLog = document.querySelector('#loginLog').value;
    const passwordLog = document.querySelector('#loginMdp').value;

    const msgErreur = connectUser(loginLog, passwordLog);

    // const reponse = await fetch(
    //     "https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/connexion.php", {
    //         method: "POST",
    //         body: new URLSearchParams({
    //             login: loginLog,
    //             mdp: passwordLog,
    //         }),
    //     }
    // );

    // const data = await reponse.json();
    // // console.log("M : ", data.message);
    // // console.log("Data : ", data);
    // // console.log("Success : ", data.status);

    // console.log(data);
    // if (data.status === "success") {
    //     // supprCookies();

    //     // let date_expiration = new Date();   //Créer un cookie avec le login de l'utilisateur en parametre. Celui ci expire au bout de 1h
    //     // date_expiration.setTime(date_expiration.getTime() + (1 * 60 * 60 * 1000));
    //     // document.cookie = "login=" + loginLog + ";expires=" + date_expiration.toUTCString() + ";path=/";

    //     //console.log("Cookie : ", document.cookie);
    //     // window.location.href = "index.html";
    //     return;
    // }
    messageErreur(msgErreur, msgErreurLog);
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
