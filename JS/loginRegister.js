var loginForm = document.getElementById('loginFormulaire');
var registerForm = document.getElementById('registerFormulaire');
let msgErreurLog = document.querySelector("#loginSpanErreur");
let msgErreurReg = document.querySelector("#RegisterSpanErreur");

//fonction register
function register(login, password) {

    const user = { login: login, mdp: password}
    console.log(user);

    fetch('https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/API/newUser.php', {
            method: 'POST',
            body: new URLSearchParams({
                login: user.login,
                mdp: user.mdp,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status == 'success') {
                // L'Authentification a réussi
                fetch('https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/API/connexion.php', {
                    method: 'POST',
                    body: new URLSearchParams({
                        login: user.login,
                        mdp: user.mdp,
                    }),
                }).then(response => response.json().then(data => {
                    supprCompteAvantDeReco();
                    let date_expiration = new Date();
                    date_expiration.setTime(date_expiration.getTime() + (1 * 60 * 60 * 1000));
                    document.cookie = "login=" + login + ";expires=" + date_expiration.toUTCString() + ";path=/";

                    return;
                }));
            }
            messageErreur(data.message, msgErreurReg);
        })
};


function supprCompteAvantDeReco(){
    let cookieString = document.cookie;
    let cookies = cookieString.split("; ");
    
    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split("=");
        const name = decodeURIComponent(parts[0]);
    
        const expires = new Date();
        expires.setTime(expires.getTime() - 1);
    
        document.cookie = `${name}=;expires=${expires.toUTCString()};path=/`;
    }
}

///////////////////////// LOGIN /////////////////////////

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    //console.log("LOGIN FORM");

    let loginLog = document.querySelector('#loginLog').value;
    let passwordLog = document.querySelector('#loginMdp').value;

    const reponse = await fetch(
        "https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/API/connexion.php", {
            method: "POST",
            body: new URLSearchParams({
                login: loginLog,
                mdp: passwordLog,
            }),
        }
    );

    const data = await reponse.json();
    // console.log("M : ", data.message);
    // console.log("Data : ", data);
    // console.log("Succes : ", data.status);

    if (data.status === "success" || data.message ==="Connexion réussie") {
        supprCompteAvantDeReco();

        let date_expiration = new Date();   //Créer un cookie avec le login de l'utilisateur en parametre. Celui ci expire au bout de 1h
        date_expiration.setTime(date_expiration.getTime() + (1 * 60 * 60 * 1000));
        document.cookie = "login=" + loginLog + ";expires=" + date_expiration.toUTCString() + ";path=/";

        //console.log("Cookie : ", document.cookie);
        return;
    }
    messageErreur(data.message, msgErreurLog);

});

///////////////////////// REGISTER ////////////////////////

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    let login = document.querySelector('#registerLog').value;
    let password = document.querySelector('#registerMdp').value;
    let passwordConfirm = document.querySelector('#registerMdpVerif').value;

    if (password === passwordConfirm) register(login, password);
    else messageErreur("Les mots de passes ne correspondent pas", msgErreurReg);
    
});

function messageErreur(msg, msgErreur) {
    msgErreur.style.color = "red";
    msgErreur.innerHTML = msg;
    setTimeout(() => {
        msgErreur.innerHTML = "";
    }, 7000);
}
