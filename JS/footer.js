// récupération de la div footer
const footer = document.querySelector("footer");

// ajout du text du footer
const footerText = document.createTextNode("Jeu développé par ");
footer.classList.add("footer-text");

footer.appendChild(footerText);

const bahahaStudio = document.createElement("span");
bahahaStudio.classList.add("bahaha-studio");
bahahaStudio.textContent = "Bahaha_studio";

footer.appendChild(bahahaStudio);