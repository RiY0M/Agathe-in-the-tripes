"use strict";

const express = require("express");
const mysql = require("mysql2");
const port = process.env.PORT || 5000;

// https://www.youtube.com/watch?v=RBcA6MKqrvo

const app = express();

const dbConfig = {
    host: 'devbdd.iutmetz.univ-lorraine.fr',
    user: 'ponzo1u_appli',
    password: '72622503',
    database: 'ponzo1u_sae501',
    // socketPath: "/tmp/mysql/mysql.sock"
}

    const db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if(err) {
            console.error("Erreur : "+err.stack);
            return;
        }
        console.log("Connection réussie");
    });
app.get("/api/leaderboard", (req, res) => {


    let data = {};

    db.query("SELECT 2", (error, rows, fields) => {
        if(error) throw error;
        
        data = rows.json();
    });

    res.json(data)

    db.end();
});

app.listen(port, () => {
    console.log("Serveur en ligne sur le port "+port);
});