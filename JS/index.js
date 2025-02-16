// VARIABLES TEST
const isConnected = !!getCookie("token");
const alreadyInGame = getCookie("level_id");


// FORMULAIRE CONNEXION / INSCRIPTION
const deconnexionForm = document.querySelector("#deconnexion-player");
const popUpNewGame = document.querySelector("#pop-up-new-game");

// par défaut, on cache ces formulaires
deconnexionForm.style.visibility = "hidden";
popUpNewGame.style.visibility = "hidden";


// BOUTONS PRINCIPAUX
const nouvellePartyButton = document.querySelector("#restart-game-button");
const continuePartyButton = document.querySelector("#start-game-button");
const confirmerNouvellePartyButton = document.querySelector("#pop-up-new-game-agree-button");

// récupération pop-up subtitle
const popUpNewGameSubtitle = document.querySelector("#pop-up-new-game-subtitle");
const span = document.createElement("span");

// bouton de confirmation de déconnexion
const btnDecoAgree = document.querySelector("#deconnexion-agree-button");


// si le joueur n'a pas de partie en cours on cache le bouton "continuer partie"
if (!alreadyInGame && getCookie("level_id") !== "7") { 
    continuePartyButton.style.display = "none";
    nouvellePartyButton.style.marginTop = "-10rem";
}

// affichage pop-up
nouvellePartyButton.addEventListener("click", () => {

    // suppression body
    ereaseBody();
    // affichage pop-up
    popUpNewGame.style.visibility = "visible";
});

confirmerNouvellePartyButton.addEventListener("click", async () => {

    const json = await callAPI("creerGame", {
        hpRemain: 3,
        nbDynamite: 0,
        level_id: 0
    });

    createCookiesFromData(json.data);
    if (json.status == 'error') {
        console.log(json.message);
    }

    window.location.replace("../HTML/phaser/lvl0.html");
});

continuePartyButton.addEventListener("click", async () => {

    const json = await callAPI("getGame", {
        hpRemain: 3,
        nbDynamite: 0,
        level_id: 0
    },
    {
        level_id: getCookie("level_id"),
        hp_remain: getCookie("hpRemain"),
        nb_dynamite: getCookie("nbDynamite"),
    });

    if (json.status == 'error') {
        console.log(json.message);
    } else {

        createCookiesFromData(json.data);
        const id = json.data.level_id;
        window.location.replace(`../HTML/phaser/lvl${id}.html`);
    }
});

// remplissage pop-up
span.textContent = "Attention, votre partie actuelle sera supprimée !";

if(!isConnected) {
    // texte sous-titre
    span.textContent = "Attention, vous vous apprêtez à jouer en tant qu'invité !";
    // création élément retour à la ligne pour conserver taille pop-up raisonnable
    const br = document.createElement("br");
    // suite du texte sous-titre
    const spanBracket = document.createElement("span");
    spanBracket.textContent = "(votre progression ne sera pas sauvegardée)";

    // ajout des éléments
    popUpNewGameSubtitle.appendChild(spanBracket);
    popUpNewGameSubtitle.appendChild(br);
}

popUpNewGameSubtitle.appendChild(span);

// VIDAGE BODY
function ereaseBody() {

    // on masque tout ce qui se trouve dans le body pour ne laisser que le formulaire
    const divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "hidden");
}

btnDecoAgree.addEventListener("click", () => {
    supprimeTousLesCookies();
    window.location.replace("index.html");
});