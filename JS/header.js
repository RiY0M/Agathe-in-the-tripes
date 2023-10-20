let header = document.querySelector("header");

// bouton retour accueil
let headerAccueil = document.createElement("a");
headerAccueil.id = "header-accueil-button"
headerAccueil.href = "../HTML/index.html";
headerAccueil.textContent = "Accueil";

// dashboard scores
let dashboardScores = document.createElement("a");
dashboardScores.id = "header-dashboard-button"
dashboardScores.href = "../HTML/leaderboard.html";
dashboardScores.textContent = "Scores";

// span vide de délimitation
let emptySpan = document.createElement("span");

// nom du joueur
let nomJoueur = document.createElement("span");
nomJoueur.id = "header-player-name";
nomJoueur.textContent = "Invité";

// création de la pp
let profilePicture = new Image();
profilePicture.id = "header-agathe-img"
profilePicture.src = "../img/agathe.png";

header.appendChild(headerAccueil);
header.appendChild(dashboardScores);
header.appendChild(emptySpan);
header.appendChild(nomJoueur);
header.appendChild(profilePicture);