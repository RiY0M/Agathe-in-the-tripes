import { callAPI, getCookie } from "./createCookiesFromData.js";


const isConnected = !!getCookie("token");

const agreeButton = document.getElementById("agree-button");
const subtitle = document.getElementById("subtitle");
const span = document.getElementById("warning");


agreeButton.addEventListener("click", async () => {

    // const json = await callAPI("creerGame", {
    //     hpRemaining: 3,
    //     nbDynamite: 0,
    //     levelId: 0
    // });
    
    // createCookiesFromData(json.data);
    // if (json.status == 'error') {
    //     console.log(json.message);
    // }

    window.location.replace("../HTML/game.html");
});

if(!isConnected) {

    span.textContent = "Attention, vous vous apprêtez à jouer en tant qu'invité !";

    const br = document.createElement("br");

    const spanBracket = document.createElement("span");
    spanBracket.textContent = "(votre progression ne sera pas sauvegardée)";

    subtitle.appendChild(br);
    subtitle.appendChild(spanBracket);
}
