let header = document.querySelector("header");

// ajout du text du footer
let headerText = document.createElement("span");
headerText.classList.add("header-text");
headerText.textContent = "Invité";

// création de la pp
let profilePicture = new Image();
profilePicture.src = "../img/agathe.png";

header.appendChild(headerText);
header.appendChild(profilePicture);