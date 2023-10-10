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

let btnEnCroix = document.querySelector(".croix");
btnEnCroix.addEventListener("click", function () {
    document.querySelector(".loginRegisterPopUp").style.display = "none";
    console.log("UHEUFUERJHNGJNJNI?");
});