const bcrypt = require('bcryptjs');

var loginForm = document.getElementById('loginFormulaire');
var registerForm = document.getElementById('registerFormulaire');

loginForm.addEventListener('submit', function (event) { //Faire code 
    event.preventDefault();
    //console.log("jirejguirjgiotfjgbiotfjg");

    let login = document.getElementById('registerLog');
    let password = document.getElementById('registerMdp');

    // let passwordMatch = bcrypt.compareSync(password, MdpInBDD); //Fct avec une req BDD pour savoir si User OK


});


registerForm.addEventListener('submit', function (event) { //faire code
    event.preventDefault();
    //console.log("TTTTTTTTEST");

    let login = document.getElementById('loginLog');
    let password = document.getElementById('loginMdp');

    const salt = bcrypt.genSaltSync(10);

    const mdpCrypte = bcrypt.hashSync(password, salt);  

    //Appelle fct 
});

let btnEnCroix = document.querySelector("#croix-log-regis");
btnEnCroix.addEventListener("click", function () {
    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "visible");

    document.querySelector(".loginRegisterPopUp").style.visibility = "hidden";
    document.querySelector("#deconnexion-player").style.visibility = "hidden";
});