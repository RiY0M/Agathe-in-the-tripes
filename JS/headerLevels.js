// bouton retour accueil
document.querySelector("#accueil").href = "../../HTML/index.html";

// dashboard scores
// document.querySelector("#dashboard").href = "../../HTML/leaderboard.html";

// credits
document.querySelector("#credits").href = "../../HTML/credits.html";

// player name
const playerName = document.querySelector("#header-player-name");
playerName.addEventListener("mouseover", () => {
    playerName.style.cursor = "default";
    playerName.style.color = "white";
});

// création de la pp
document.querySelector("#agathe-img").src = "../../img/agathe.png";