// sélection de toutes les croix
let everyCroix = document.querySelectorAll(".cancel-croix-pop-up");

// évement au clic de la croix
everyCroix.forEach((croix) => {

    croix.addEventListener("click", function () {

        // affichage du body
        let divInBody = document.querySelectorAll("body>div");
        divInBody.forEach((div) => div.style.visibility = "visible");
    
        // on cache toutes les pop-up
        document.querySelector(".loginRegisterPopUp").style.visibility = "hidden";
        document.querySelector("#deconnexion-player").style.visibility = "hidden";
        document.querySelector("#pop-up-new-game").style.visibility = "hidden";
    });
});

