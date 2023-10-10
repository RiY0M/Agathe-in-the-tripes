// QUITTER LE FORMULAIRE DECONNEXION
let quitterCroix = document.querySelector("#croix-deco");
let annulerBtn = document.querySelector("#deconnexion-cancel-button");
let agreeBtn = document.querySelector("#deconnexion-agree-button");


function quitterFormDeco() {
    // on affiche de nouveau le contenu du body
    let divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "visible");

    // on cache le formulaire de déconnexion et celui de connexion/inscription
    document.querySelector("#deconnexion-player").style.visibility = "hidden";
    document.querySelector(".loginRegisterPopUp").style.visibility = "hidden";
}


// annuler deconnexion (croix)
quitterCroix.addEventListener("click", () => {

    quitterFormDeco();
});

// annuler deconnexion (annuler)
annulerBtn.addEventListener("click", () => {

    quitterFormDeco();
});

// deconnexion
agreeBtn.addEventListener("click", () => {

    quitterFormDeco();

    // PSEUDO DU JOUEUR
    isConnected = false;
});

