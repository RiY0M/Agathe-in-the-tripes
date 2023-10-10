"use strict";

const express = require("express");
const mysql = require("mysql");
const port = process.env.PORT;

const app = express();

export const dbConfig =  mysql.createConnection({
    host: 'devbdd.iutmetz.univ-lorraine.fr',
    user: 'ponzo1u_appli',
    password: '72622503',
    database: 'ponzo1u_sae501',
    // socketPath: "/tmp/mysql/mysql.sock"
});

dbConfig.connect(err => {
    if(err) {
        console.error("Erreur : "+err.stack);
        return;
    }
    console.log("Connection réussie");
});

dbConfig.query("query")

app.listen(port, () => {
    console.log("Serveur en ligne");
});