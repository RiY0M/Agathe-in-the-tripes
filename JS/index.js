import { getCookie, callAPI, createCookiesFromData } from "./createCookiesFromData.js";

const alreadyInGame = getCookie("level_id") && getCookie("level_id") !== "7"; // todo: verify within game
const continueGameButton = document.getElementById("start-game");

if (!alreadyInGame) { 
    continueGameButton.style.display = "none";
}

continueGameButton.addEventListener("click", async () => {

    const json = await callAPI("getGame", {
        hpRemaining: 3,
        nbDynamite: 0,
        levelId: 0
    },
    {
        hpRemaining: getCookie("hpRemaining"),
        nbDynamite: getCookie("nbDynamite"),
        levelId: getCookie("levelId"),
    });

    if (json.status == 'error') {
        console.log(json.message);
    } else {

        createCookiesFromData(json.data);
        window.location.replace(`../HTML/game.html`);
    }
});
