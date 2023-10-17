//const bcrypt = require('bcryptjs');

var loginForm = document.getElementById('loginFormulaire');
var registerForm = document.getElementById('registerFormulaire');
let apiData;
let apiDataUsers;

///////////////////////// API /////////////////////////

async function fetchDataAPI(lien) { //Fonction qui permet de récupérer les données de l'API 
    try {
        const response = await fetch(lien);
        
        if (!response.ok) {
            throw new Error("Erreur lors de la requête SQL");
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
async function recupUserFromApi() { //Pour le login
    try {
        apiDataUsers = await fetchDataAPI("http://localhost:5501/api/loginRegister");
        //console.log("API Data:", apiDataUsers);
    } catch (error) {
        console.error("Error:", error);
    }
}

function register(login, password) {
    Headers('Access-Control-Allow-Origin: *');
    //const salt = bcrypt.genSaltSync(10);
    console.log('BTN APPUYE');
    let salt = null;
    

    const user = { login: login, mdp: password, salt: salt }
    console.log(user);
    fetch('https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/JS/api_LoginRegister.js', {
            method: 'POST',
            body: new URLSearchParams({
                login: user.login,
                mdp: user.password,
                salt: user.salt,
            }),
    });
}






//const mdpCrypte = bcrypt.hashSync(password, salt);  








///////////////////////// LOGIN /////////////////////////

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("jirejguirjgiotfjgbiotfjg");

    let login = document.querySelector('#loginLog').value;
    let password = document.querySelector('#loginMdp').value;

    await recupUserFromApi();

    // let passwordMatch = bcrypt.compareSync(password, MdpInBDD); //Fct avec une req BDD pour savoir si User OK

    for (let i = 0; i < apiDataUsers.length; i++) {
        if (login == apiDataUsers[i].login && password == apiDataUsers[i].mdp) {
            console.log("OK");

            let date_expiration = new Date();   //Création d'un cookie pour le login
            date_expiration.setTime(date_expiration.getTime() + (1 * 60 * 60 * 1000));
            document.cookie = "login=" + apiDataUsers[i].login + ";expires=" + date_expiration.toUTCString() + ";path=/";

        }
    }

});

///////////////////////// REGISTER /////////////////////////

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    let login = document.querySelector('#registerLog').value;
    let password = document.querySelector('#registerMdp').value;
    let passwordConfirm = document.querySelector('#registerMdpVerif').value;

    let mdpCorrecte = false;
    let loginExiste = false;

    if (password === passwordConfirm) mdpCorrecte = true;

    await recupUserFromApi();

    for (let i = 0; i < apiDataUsers.length; i++) {
        if (login == apiDataUsers[i].login) loginExiste = true;
    }
    if (mdpCorrecte && !loginExiste) register(login, password);
    
});


///////////////////////// POP UP /////////////////////////
let btnEnCroix = document.querySelector("#croix-log-regis");
btnEnCroix.addEventListener("click", function () {
    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "visible");

    document.querySelector(".loginRegisterPopUp").style.visibility = "hidden";
    document.querySelector("#deconnexion-player").style.visibility = "hidden";
});