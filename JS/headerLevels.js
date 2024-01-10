// bouton retour accueil
document.querySelector("#header-accueil-button").href = "../../HTML/index.html";

// dashboard scores
document.querySelector("#header-dashboard-button").href = "../../HTML/leaderboard.html";

// credits
document.querySelector("#header-credits-button").href = "../../HTML/credits.html";

// player name
let playerName = document.querySelector("#header-player-name");
playerName.addEventListener("mouseover", () => {
    playerName.style.cursor = "default";
    playerName.style.color = "white";
});

// création de la pp
document.querySelector("#header-agathe-img").src = "../../img/agathe.png";