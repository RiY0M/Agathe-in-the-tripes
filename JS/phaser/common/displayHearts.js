// nombre de coeurs par défaut (3)
let nbHearts = 3;
// immortalité par défaut (non)
let isInvicible = false;


// div affichage des coeurs
let lifeDiv = document.createElement("div");
lifeDiv.className += "life-div";

// image des coeurs
let heartImage = new Image();
heartImage.className += "heart-image";

// lien de l'image des coeurs en fonction du nb de coeurs
heartImage.src = "../../../img/assets/" + nbHearts + "-heart.png";
lifeDiv.appendChild(heartImage);

// affichage de la vie
document.querySelector("body").appendChild(lifeDiv);



// rafraichissement des coeurs
function reloadNbHearts()
{
    document.querySelector(".heart-image").src = "../../../img/assets/" + nbHearts + "-heart.png";
}