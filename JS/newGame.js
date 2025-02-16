const isConnected = !!getCookie("token");


const agreeButton = document.querySelector("#agree-button");

// récupération pop-up subtitle
const subtitle = document.querySelector("#subtitle");
const span = document.getElementById("warning");


agreeButton.addEventListener("click", async () => {

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

if(!isConnected) {
    // texte sous-titre
    span.textContent = "Attention, vous vous apprêtez à jouer en tant qu'invité !";
    // création élément retour à la ligne pour conserver taille raisonnable
    const br = document.createElement("br");
    // suite du texte sous-titre
    const spanBracket = document.createElement("span");
    spanBracket.textContent = "(votre progression ne sera pas sauvegardée)";

    // ajout des éléments
    subtitle.appendChild(br);
    subtitle.appendChild(spanBracket);
}
