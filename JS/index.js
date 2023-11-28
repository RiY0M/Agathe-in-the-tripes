const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("login="))?.split("=")[1]; // récupération de la valeur du cookie "login"

// VARIABLES TEST
let isConnected = cookieValue ? true : false;
let pseudo = cookieValue ? cookieValue : "Invité";
let alreadyAGame = true;


// FORMULAIRE CONNEXION / INSCRIPTION
let loginRegisterForm = document.querySelector(".loginRegisterPopUp");
let deconnexionForm = document.querySelector("#deconnexion-player");
let popUpNewGame = document.querySelector("#pop-up-new-game");

// par défaut, on cache ces formulaires
loginRegisterForm.style.visibility = "hidden";
deconnexionForm.style.visibility = "hidden";
popUpNewGame.style.visibility = "hidden";


// BOUTONS PRINCIPAUX
const loginRegisterButton = document.querySelector("#login-register-button");
const nouvellePartyButton = document.querySelector("#restart-game-button");
const continuePartyButton = document.querySelector("#start-game-button");
const confirmerNouvellePartyButton = document.querySelector("#pop-up-new-game-agree-button");

// récupération pop-up subtitle
const popUpNewGameSubtitle = document.querySelector("#pop-up-new-game-subtitle");

// PSEUDO DU JOUEUR
const headerPseudo = document.querySelector("#header-player-name");


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


// affichage pop-up
nouvellePartyButton.addEventListener("click", () => {

    // suppression body
    ereaseBody();
    // affichage pop-up
    popUpNewGame.style.visibility = "visible";
});

confirmerNouvellePartyButton.addEventListener("click", () => {

    fetch('https://devweb.iutmetz.univ-lorraine.fr/~rigaut6u/SAE_501/API/creerGame.php')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if (json.status == 'error') {
            console.log(json.message);
        }
    });

    window.location.replace("../HTML/phaser/lvl0.html");
});

// remplissage pop-up

// boîte sous-titre
let span = document.createElement("span");

// CAS POUR CONNECTE
if (isConnected) {
    // texte sous-titre
    span.textContent = "Attention, votre partie actuelle sera supprimée !";

    popUpNewGameSubtitle.appendChild(span);
}
// CAS POUR INVITE
else {
    // texte sous-titre
    span.textContent = "Attention, vous vous apprêtez à jouer en tant qu'invité !";
    // création élément retour à la ligne pour conserver taille pop-up raisonnable
    let br = document.createElement("br");
    // suite du texte sous-titre
    let spanBracket = document.createElement("span");
    spanBracket.textContent = "(votre progression ne sera pas sauvegardée)";

    // ajout des éléments
    popUpNewGameSubtitle.appendChild(span);
    popUpNewGameSubtitle.appendChild(br);
    popUpNewGameSubtitle.appendChild(spanBracket);
}


// VIDAGE BODY
function ereaseBody() {

    // on masque tout ce qui se trouve dans le body pour ne laisser que le formulaire
    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "hidden");
}

const btnDecoAgree = document.querySelector("#deconnexion-agree-button"); // bouton de confirmation de déconnexion

btnDecoAgree.addEventListener("click", () => {
    supprimeTousLesCookies();
    window.location.href = "index.html";
});

//Fonction qui supprime tous les cookies existants
function supprimeTousLesCookies() {
    document.cookie.split(";").forEach(cookie => {
        const [name] = cookie.split("=");
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
}