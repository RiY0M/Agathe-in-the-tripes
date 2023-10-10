// récupération de la div footer
let footer = document.querySelector("footer");

// ajout du text du footer
let footerText = document.createTextNode("Jeu développé par ");
footer.classList.add("footer-text");

footer.appendChild(footerText);

let bahahaStudio = document.createElement("span");
bahahaStudio.classList.add("bahaha-studio");
bahahaStudio.textContent = "Bahaha_studio";

footer.appendChild(bahahaStudio);