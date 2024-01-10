const header = document.querySelector("header");

const pseudo = getCookie("login"); // récupération de la valeur du cookie "login"

// bouton retour accueil
const headerAccueil = document.createElement("a");
headerAccueil.id = "header-accueil-button"
headerAccueil.href = "../HTML/index.html";
headerAccueil.textContent = "Accueil";

// dashboard scores
// const dashboardScores = document.createElement("a");
// dashboardScores.id = "header-dashboard-button"
// dashboardScores.href = "../HTML/leaderboard.html";
// dashboardScores.textContent = "Scores";

// credit/remerciements
const creditRemerciements = document.createElement("a");
creditRemerciements.id = "header-credits-button"
creditRemerciements.href = "../HTML/credits.html";
creditRemerciements.textContent = "Crédits";

// span vide de délimitation
const emptySpan = document.createElement("span");

// nom du joueur
const nomJoueur = document.createElement("span");
nomJoueur.id = "header-player-name";
nomJoueur.textContent = pseudo ? pseudo : "Invité";

// création de la pp
const profilePicture = new Image();
profilePicture.id = "header-agathe-img"
profilePicture.src = "../img/agathe.png";

header.appendChild(headerAccueil);
header.appendChild(dashboardScores);
header.appendChild(creditRemerciements);
header.appendChild(emptySpan);
header.appendChild(nomJoueur);
header.appendChild(profilePicture);