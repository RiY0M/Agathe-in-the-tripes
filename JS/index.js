let isConnected = true;
let pseudo = "LLazry";
let alreadyAGame = true;

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
}