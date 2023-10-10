"use strict";

// require("./database.js");
// import { dbConfig } from "./database.js";
// import "./database.js";

// console.log("test");
// console.log(dbConfig);

fetch("/JS/database.js")
.then(reponse => {
    console.log(reponse);
    reponse.json();
})
.then(data => console.log(data))