"use strict";

const express = require("express");
const cors = require('cors');
const mysql = require("mysql2");
const app = express();

const port = process.env.PORT || 5500; // port identique à celui utilisé par live server
const apiUrl = "/api/leaderboard";
// const corsOptions = {
//     origin: `http://localhost:${port}`, // Replace with your frontend URL
// };

const dbConfig = {
    host: 'devbdd.iutmetz.univ-lorraine.fr',
    user: 'ponzo1u_appli',
    password: '72622503',
    database: 'ponzo1u_sae501',
}

let db;
handleDisconnect();

// let callback_var;
let recordsTotal;
let recordsNiv0;

queryTotal();
queryNiv0();


app.use(cors());
// app.use(cors(corsOptions));
app.get(apiUrl, (req, res) => {
    
    db.query("SELECT * FROM LEVELS;", (error, rows) => {
        if(error) throw error;

        res.json([
            {levels: rows},
            {total: recordsTotal},
            {niv0: recordsNiv0}
        ]);
    });

    
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

// function query(whereClause, callback = (callback_var) => {}) {
//     db.query(
//     `SET @row_number = 0;

//     CREATE TEMPORARY TABLE T1
    
//     SELECT (@row_number:=@row_number + 1) AS num,
//     login,
//     LEFT(DATE_FORMAT(SEC_TO_TIME(complete_time), "%i:%s:%f"), 9) AS complete_time
//     FROM SCORES S
//     INNER JOIN GAMES G ON S.game_id = G.id
//     INNER JOIN USERS U ON G.user_id = U.id
//     WHERE ${whereClause}
//     ORDER BY complete_time ASC;
    
//     SELECT * FROM (SELECT * FROM T1 LIMIT 0,5) AS TAB
//     UNION ALL
//     SELECT * FROM (SELECT * FROM T1 WHERE login = '${user.login !== undefined ? user.login : ""}' LIMIT 0,1) AS TAB;
    
//     DROP TEMPORARY TABLE T1;`,
//         (err, result) => {
//             if (err) { console.error(err); return; }
//             callback_var = [];

//             for (let user of result) {
//                 callback_var.push({num: user["num"], name: user["login"], complete_time: user["complete_time"]});
//             }

//             callback(callback_var);
//         }
//     );
// }

function queryTotal(callback = (recordsTotal) => {}) {
    // query("S.level_id = 7", callback(recordsTotal))
    db.query(
        `SET @row_number = 0;

        CREATE TEMPORARY TABLE T1

        SELECT @row_number:=@row_number + 1 AS num,
        login,
        LEFT(DATE_FORMAT(SEC_TO_TIME(complete_time), "%i:%s:%f"), 9) AS complete_time
        FROM SCORES S
        INNER JOIN GAMES G ON S.game_id = G.id
        INNER JOIN USERS U ON G.user_id = U.id
        WHERE S.level_id = 7
        ORDER BY complete_time ASC;

        SELECT * FROM (SELECT * FROM T1 LIMIT 0,5) AS TAB
        UNION ALL
        SELECT * FROM (SELECT * FROM T1 WHERE login = '${typeof login !== "undefined" ? login : ""}' LIMIT 0,1) AS TAB;

        DROP TEMPORARY TABLE T1;`,
        // remplacer login par l'accès au login
        (err, result) => {
            if (err) { console.error(err); return; }
            recordsTotal = [];

            for (let user of result) {
                recordsTotal.push({num: user["num"], name: user["login"], complete_time: user["complete_time"]});
            }

            callback(recordsTotal);
        }
    );
}

function queryNiv0(callback = (recordsNiv0) => {}) {
    db.query(
        "SELECT login, complete_time FROM SCORES S INNER JOIN GAMES G ON S.game_id = G.id INNER JOIN USERS U ON G.user_id = U.id WHERE S.level_id = 0 ORDER BY complete_time ASC",
        (err, result) => {
            if (err) {console.error(err); return;}
            recordsNiv0 = [];

            for (let user of result) {
                recordsNiv0.push({num: user["num"], name: user["login"], complete_time: user["complete_time"]});
            }

            callback(recordsNiv0);
        }
    );
}

// function getTotal() {
//     queryTotal();
//     return recordsTotal;
// }

// function getNiv0() {
//     queryNiv0();
//     return recordsNiv0;
// }