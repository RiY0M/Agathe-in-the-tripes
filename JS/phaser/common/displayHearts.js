let nbHearts = 3;
let isInvicible = false;


let lifeDiv = document.createElement("div");
lifeDiv.className += "life-div";

let heartImage = new Image();
heartImage.className += "heart-image";

heartImage.src = "../../../img/assets/" + nbHearts + "-heart.png";
lifeDiv.appendChild(heartImage);

document.querySelector("body").appendChild(lifeDiv);



function reloadNbHearts()
{
    document.querySelector(".heart-image").src = "../../../img/assets/" + nbHearts + "-heart.png";
}