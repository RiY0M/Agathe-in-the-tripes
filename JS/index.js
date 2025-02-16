import { getCookie, callAPI, createCookiesFromData } from "./createCookiesFromData.js";

const alreadyInGame = getCookie("level_id") && getCookie("level_id") !== "7";

const continuePartyButton = document.querySelector("#start-game");

// si le joueur n'a pas de partie en cours on cache le bouton "continuer partie"
if (!alreadyInGame) { 
    continuePartyButton.style.display = "none";
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
