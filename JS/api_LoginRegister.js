"use strict";

const dbConfig = {
    host: 'devbdd.iutmetz.univ-lorraine.fr',
    user: 'ponzo1u_appli',
    password: '72622503',
    database: 'ponzo1u_sae501',
    multipleStatements: true //! Pas sécurisé, mais permet de faire plusieurs requêtes en une seule
};

// IMPORTS
const express = require("express");
const cors = require('cors');
const mysql = require("mysql2");
//const { dbConfig } = require("./database");
const app = express();

// GLOBAL VAR
const port = process.env.PORT || 5501; // port identique à celui utilisé par live server
const apiUrl = "/api/loginRegister";

let db;
handleDisconnect();


let user;
user = queryUsers();

app.use(cors());
app.get(apiUrl, (req, res) => {
    
    let data;
    db.query("SELECT * FROM `USERS`;", (error, rows) => {
        if(error) throw error;

        data = rows;
    });

    res.json(user);

    closeConnect();
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}${apiUrl}`);
});


//!! FUNCTIONS

/**
 * Open db connection and handle errors
 * NEED GLOBAL VAR db and dbConfig
 */
function handleDisconnect() {

    // Recreate the db, since the old one cannot be reused.
    db = mysql.createConnection(dbConfig);

    db.connect((err) => { // The server is either down
        if(err) {         // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } else {
            console.log("Connected to database");
        }
    }); // process asynchronous requests in the meantime.
        // If you're also serving http, display a 503 error.
    db.on('error', (err) => {
        
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            console.log("SQL Disconnect");
            handleDisconnect();                       // lost due to either server restart, or a
        } else { 
            console.log('db error', err);             // connnection idle timeout (the wait_timeout
            throw err;                                // server variable configures this)
        }
    });
}

/**
 * Close db connection and handle errors
 * NEED GLOBAL VAR db
 */
function closeConnect() {
    process.on('SIGINT', () => {
        db.end(err => {
            if (err) console.error('Error closing database connection:', err);
            process.exit();
        });
    });
}


function queryUsers() {
    let allUsers = [];

    db.query("SELECT * FROM `USERS`;", (err, result, fields) => {
        if (err) { 
            console.error(err);
            return;
        }


        for (let user of result) {
            allUsers.push({ id_us: user["id"], login: user["login"], mdp: user["mdp"], salt: user["salt"] });
        }

    });

    return allUsers;
}


function queryAjoutUser(leLogin, leMdp, leSalt) {

    db.query(`INSERT INTO USERS (id, login, mdp, salt) VALUES (NULL, '${leLogin}', '${leMdp}', '${leSalt}');`, (err, result) => {
        if (err) { 
            console.error(err);
            return;
        }

        console.log(result);
    });
}