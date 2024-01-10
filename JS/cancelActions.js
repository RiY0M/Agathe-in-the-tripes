// QUITTER UNE POP-UP (ANNULER)
function cancelPopUp(elt) {

    elt.addEventListener("click", () => {

        // affichage du body
        const divInBody = document.querySelectorAll("body>div");
        divInBody.forEach((div) => div.style.visibility = "visible");
    
        // on cache toutes les pop-up
        document.querySelector(".loginRegisterPopUp").style.visibility = "hidden";
        document.querySelector("#deconnexion-player").style.visibility = "hidden";
        document.querySelector("#pop-up-new-game").style.visibility = "hidden";
    });
}


// sélection de toutes les croix
const everyCroix = document.querySelectorAll(".cancel-croix-pop-up");
const everyAnnuler = document.querySelectorAll(".cancel-annuler-pop-up");

// évement au clic de la croix et du bouton annuler
everyCroix.forEach((croix) => {cancelPopUp(croix)});
everyAnnuler.forEach((annuler) => {cancelPopUp(annuler)});
