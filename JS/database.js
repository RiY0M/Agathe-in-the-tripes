"use strict";

// const express = require("express");
const mysql = require("mysql2");
// const port = process.env.PORT || 5000;

// https://www.youtube.com/watch?v=RBcA6MKqrvo

// const app = express();

// app.get("/api/leaderboard", (req, res) => {
    
//     const db = mysql.createConnection(dbConfig);
    
//     db.connect(err => {
//         if(err) {
//             console.error("Erreur : "+err.stack);
//             return;
//         }
//         console.log("Connection réussie");
//     });

//     let data = {};

//     db.query("SELECT 2", (error, rows, fields) => {
//         if(error) throw error;
        
//         data = rows.json();
//     });

//     res.json(data)

//     db.end();
// });

// app.listen(port, () => {
//     console.log("Serveur en ligne sur le port "+port);
// });

const dbConfig = {
    host: 'devbdd.iutmetz.univ-lorraine.fr',
    user: 'ponzo1u_appli',
    password: '72622503',
    database: 'ponzo1u_sae501',
    // socketPath: "/tmp/mysql/mysql.sock"
}

var db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig); // Recreate the db, since
                                                  // the old one cannot be reused.

  db.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
        console.log("Connected to database");
    }
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  db.on('error', function(err) {
    
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
	console.log("SQL Disconnect");
      handleDisconnect();                         // lost due to either server restart, or a
    } else { 
	console.log('db error', err);              // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

let recordsTotal;
let recordsNiv0;

function queryTotal(callback = (recordsTotal) => {}) {
    db.query(
        "SELECT login, complete_time FROM SCORES S INNER JOIN GAMES G ON S.game_id = G.id INNER JOIN USERS U ON G.user_id = U.id WHERE G.level_id = 7 ORDER BY complete_time DESC",
        function (err, result) {
            if (err) { console.error(err); return; }
            recordsTotal = [];
            
            let i = 1;
            for (let user of result) {
                recordsTotal.push({num: i, nom: user["login"], complete_time: user["complete_time"]});
                i++;
            }

            callback(recordsTotal);
        }
    );
}

function queryNiv0(callback = (recordsNiv0) => {}) {
    db.query(
        "SELECT login, complete_time FROM SCORES S INNER JOIN GAMES G ON S.game_id = G.id INNER JOIN USERS U ON G.user_id = U.id WHERE S.level_id = 0 ORDER BY complete_time DESC",

        (err, result) => {
            if (err) {console.error(err); return;}
            recordsNiv0 = [];

            let i = 1;
            for (let user of result) {
                recordsNiv0.push({num: i, nom: user["login"], complete_time: user["complete_time"]});
                i++;
            }

            callback(recordsNiv0);
        }
    );
}

queryTotal();
queryNiv0();

function getTotal() {
    return recordsTotal;
}

function getNiv0() {
    return recordsNiv0;
}


module.exports = {
    db,
    getTotal,
    getNiv0,
    queryTotal,
    queryNiv0
}