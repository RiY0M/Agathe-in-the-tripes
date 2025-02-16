// VARIABLES TEST
const isConnected = !!getCookie("token");
const alreadyInGame = getCookie("level_id");


// BOUTONS PRINCIPAUX
const nouvellePartyButton = document.querySelector("#restart-game");
const continuePartyButton = document.querySelector("#start-game");


// si le joueur n'a pas de partie en cours on cache le bouton "continuer partie"
if (!alreadyInGame && getCookie("level_id") !== "7") { 
    continuePartyButton.style.display = "none";
    nouvellePartyButton.style.marginTop = "-10rem";
}

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


// VIDAGE BODY
function ereaseBody() {

    // on masque tout ce qui se trouve dans le body pour ne laisser que le formulaire
    const divInBody = document.querySelectorAll("body>div");
    divInBody.forEach((div) => div.style.visibility = "hidden");
}
