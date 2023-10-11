"use strict";

fetch("http://localhost:5500/api/leaderboard")
.then(reponse => reponse.json())
.then(data => console.log(data))
.catch(error => console.error("Error : " + error));