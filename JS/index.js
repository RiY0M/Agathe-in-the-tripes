let isConnected = false;
let pseudo = "LLazry";
let alreadyAGame = true;

let loginRegisterForm = document.querySelector(".loginRegisterPopUp");
loginRegisterForm.style.visibility = "hidden";


let loginRegisterButton = document.querySelector("#login-register-button");
let nouvellePartyButton = document.querySelector("#restart-game-button");
let continuePartyButton = document.querySelector("#start-game-button");

let headerPseudo = document.querySelector("#header-player-name");


if (!alreadyAGame) { 
    continuePartyButton.style.display = "none";
    nouvellePartyButton.style.marginTop = "-10rem";
}


if (isConnected) {
    headerPseudo.textContent = pseudo;
    loginRegisterButton.value = "Déconnexion";
}

loginRegisterButton.addEventListener("click", () => {

    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "hidden");

    loginRegisterForm.style.visibility = "visible";
})