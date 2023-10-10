var loginForm = document.getElementById('loginFormulaire');
var registerForm = document.getElementById('registerFormulaire');

loginForm.addEventListener('submit', function (event) { //Faire code 
    event.preventDefault();
    console.log("jirejguirjgiotfjgbiotfjg");
});


registerForm.addEventListener('submit', function (event) { //faire code
    event.preventDefault();
    console.log("TTTTTTTTEST");
});

let btnEnCroix = document.querySelector("#croix-log-regis");
btnEnCroix.addEventListener("click", function () {
    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "visible");

    document.querySelector(".loginRegisterPopUp").style.visibility = "hidden";
    document.querySelector("#deconnexion-player").style.visibility = "hidden";
});