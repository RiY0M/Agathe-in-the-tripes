// VARIABLES TEST
let isConnected = true;
let pseudo = "LLazry";
let alreadyAGame = true;


// FORMULAIRE CONNEXION / INSCRIPTION
let loginRegisterForm = document.querySelector(".loginRegisterPopUp");
let deconnexionForm = document.querySelector("#deconnexion-player");

// par défaut, on cache ces formulaires
loginRegisterForm.style.visibility = "hidden";
deconnexionForm.style.visibility = "hidden";


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

    // on permet à l'utilisateur de voir le formulaire de deconnexion

    // DEPUIS LE BOUTON DECONNEXION
    loginRegisterButton.addEventListener("click", () => {

        // vidage body
        ereaseBody();
        
        // affichage du formulaire connexion / inscription
        deconnexionForm.style.visibility = "visible";
    })

    // DEPUIS LE PSEUDO DU JOUEUR
    headerPseudo.addEventListener("click", () => {

        // vidage body
        ereaseBody();
        
        // affichage du formulaire connexion / inscription
        deconnexionForm.style.visibility = "visible";
    })
}

// si le joueur n'est pas connecté :
else {
    // on affiche le nom "Invité"
    headerPseudo.textContent = "Invité";

    // on permet à l'utilisateur de voir le formulaire d'inscription et de connexion

    // DEPUIS LE BOUTON CONNEXION / INSCRIPTION
    loginRegisterButton.addEventListener("click", () => {

        // vidage body
        ereaseBody();
        
        // affichage du formulaire connexion / inscription
        loginRegisterForm.style.visibility = "visible";
    })

    // DEPUIS LE PSEUDO DU JOUEUR
    headerPseudo.addEventListener("click", () => {

        // vidage body
        ereaseBody();
        
        // affichage du formulaire connexion / inscription
        loginRegisterForm.style.visibility = "visible";
    })
}


// VIDAGE BODY
function ereaseBody() {

    // on masque tout ce qui se trouve dans le body pour ne laisser que le formulaire
    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "hidden");
}