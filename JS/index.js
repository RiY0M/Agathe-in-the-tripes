// VARIABLES TEST
let isConnected = false;
let pseudo = "LLazry";
let alreadyAGame = true;


// FORMULAIRE CONNEXION / INSCRIPTION
let loginRegisterForm = document.querySelector(".loginRegisterPopUp");
// par défaut, on cache ce formulaire
loginRegisterForm.style.visibility = "hidden";


// BOUTONS PRINCIPAUX
let loginRegisterButton = document.querySelector("#login-register-button");
let nouvellePartyButton = document.querySelector("#restart-game-button");
let continuePartyButton = document.querySelector("#start-game-button");

// PSEUDO DU JOUEUR
let headerPseudo = document.querySelector("#header-player-name");


// si le joueur n'a pas de partie en cours on cache le bouton "nouvelle partie"
if (!alreadyAGame) { 
    continuePartyButton.style.display = "none";
    nouvellePartyButton.style.marginTop = "-10rem";
}


// si le joueur est déjà connecté :
if (isConnected) {
    // on affiche son pseudo
    headerPseudo.textContent = pseudo;

    // on change le bouton pour "déconnexion"
    loginRegisterButton.value = "Déconnexion";
}

// si le joueur n'est pas connecté :
else {
    // on affiche le nom "Invité"
    headerPseudo.textContent = pseudo;

    // on permet à l'utilisateur de voir le formulaire d'inscription et de connexion

    // DEPUIS LE BOUTON CONNEXION / INSCRIPTION
    loginRegisterButton.addEventListener("click", () => {

        // on masque tout ce qui se trouve dans le body pour ne laisser que le formulaire
        let divInBody = document.querySelectorAll("body>div");
        divInBody.forEach((div) => div.style.visibility = "hidden");
        
        // affichage du formulaire connexion / inscription
        loginRegisterForm.style.visibility = "visible";
    })

    // DEPUIS LE PSEUDO DU JOUEUR
    headerPseudo.addEventListener("click", () => {

        // on masque tout ce qui se trouve dans le body pour ne laisser que le formulaire
        let divInBody = document.querySelectorAll("body>div");
        divInBody.forEach((div) => div.style.visibility = "hidden");
        
        // affichage du formulaire connexion / inscription
        loginRegisterForm.style.visibility = "visible";
    })
}