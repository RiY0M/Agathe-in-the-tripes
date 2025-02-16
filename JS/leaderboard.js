"use strict";

import { callAPI } from "./createCookiesFromData.js";

//^ Tag to modify with the data
const titreNiv = document.getElementById("titre-niv");
let cases = [];

for(let i = 1; i <= 5; i++) {
    cases.push(document.getElementById("num" + i));
}
cases.push(document.getElementById("you"));

//^ Nav buttons values
const btnLabels = {
    0: "Forêt",
    1: "Bouche",
    2: "Œsophage",
    3: "Estomac",
    4: "Intestin",
    5: "Anus",
    6: "Sortie",
    7: "Boss",
    8: "Total"
};

const gameButtons = document.getElementById("leaderboard-buttons");
const buttons = [];

for(let key in btnLabels) {
    const button = document.createElement("button");
    button.id = key;
    button.type = "button";
    button.innerText = btnLabels[key];
    button.class = "";
    button.addEventListener("click", () => changeAffichage(key));
    buttons.push(button);
    gameButtons.appendChild(button);
};

buttons[5].class = "active";

//^ Functions
async function changeAffichage(valueToChange) {

    //^ Data from the api
    const json = await callAPI("getLeaderboard", {
        error: "Not connected to db"
    });
    if(json.status == 'error') {
        console.log(json.message);
    }

    const apiData = json.data;
    // console.log(apiData);

    const levelInfo = apiData["levels"].filter(data => data["id"] == valueToChange)[0];
    const id = levelInfo["id"];

    buttons.forEach(button => {
        if(button.classList.contains("active")) button.classList.remove("active");
    });
    buttons.forEach(button => {
        if(button.id == id) button.classList.add("active");
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
changeAffichage(8);
