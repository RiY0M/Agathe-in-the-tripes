"use strict";

//^ Data from the api
let apiData;

// http://localhost:5500/api/leaderboard
await fetch("https://devweb.iutmetz.univ-lorraine.fr/~schandel2u/SAE501/API/getLeaderboard.php")
.then(reponse => reponse.json())
.then(realData => apiData = realData.data)
.catch(error => console.error("Error : " + error));

console.log(apiData)

//^ Tag to modify with the data
const titreNiv = document.getElementById("titre-niv");
let cases = [];

for(let i = 1; i <= 5; i++) {
    cases.push(document.getElementById("num" + i));
}
cases.push(document.getElementById("you"));

//^ Nav buttons values
const btnLabels = {
    0: "Prologue",
    1: "Niv 1",
    2: "Niv 2",
    3: "Niv 3",
    4: "Niv 4",
    5: "Niv 5",
    // 6: "épilogue",
    7: "Total"
};

const gameButtons = document.getElementById("game-buttons");
let buttons = [];

for(let key in btnLabels) {
    let input = document.createElement("input");
    input.id = key;
    input.type = "button";
    input.value = btnLabels[key];
    input.class = "";
    input.addEventListener("click", () => changeAffichage(key));
    buttons.push(input);
    gameButtons.appendChild(input);
};

buttons[5].class = "active";

//^ Functions
function changeAffichage(valueToChange) {

    const levelInfo = apiData["levels"].filter(data => data["id"] == valueToChange)[0];
    const id = levelInfo["id"];

    buttons.forEach(input => {
        if(input.classList.contains("active")) input.classList.remove("active");
    });
    buttons.forEach(input => {
        if(input.id == id) input.classList.add("active");
    });

    titreNiv.innerHTML = "Records : " + levelInfo["name"];
    
    for(let i = 0; i <=5; i++) {

        const tr = cases[i];
        const value = apiData["niv" + id][i];

        const number = tr.getElementsByClassName("number")[0];
        const name = tr.getElementsByClassName("name")[0];
        const time = tr.getElementsByClassName("time")[0];

        number.innerHTML = value["num"] + ":";
        name.innerHTML = value["name"];
        time.innerHTML = value["complete_time"];
    }
}

//^ Initializer

changeAffichage(7);