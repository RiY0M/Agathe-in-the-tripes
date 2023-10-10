"use strict";

// require("./database.js");
// import { dbConfig } from "./database.js";
// import "./database.js";

// console.log("test");
// console.log(dbConfig);

// https://devweb.iutmetz.univ-lorraine.fr
fetch("localhost:5000/api/leaderboard")
.then(reponse => {
    console.log(reponse);
    reponse.json();
})
.then(data => console.log(data))