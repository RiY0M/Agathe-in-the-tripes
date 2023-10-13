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
    multipleStatements: true //! Pas sécurisé
}

let db;
handleDisconnect();

// let callback_var;
let recordsTotal;
let recordsNiv0;
let recordsNiv1;
let recordsNiv2;
let recordsNiv3;
let recordsNiv4;
let recordsNiv5;

queryTotal();
queryNiv0();
queryNiv1();
queryNiv2();
queryNiv3();
queryNiv4();
queryNiv5();


app.use(cors());
// app.use(cors(corsOptions));
app.get(apiUrl, (req, res) => {
    
    db.query("SELECT * FROM LEVELS;", (error, rows) => {
        if(error) throw error;

        res.json([
            {levels: rows},
            {total: recordsTotal},
            {niv0: recordsNiv0},
            {niv1: recordsNiv1},
            {niv2: recordsNiv2},
            {niv3: recordsNiv3},
            {niv4: recordsNiv4},
            {niv5: recordsNiv5},

            //^^ si les fonctions retournent des valeurs
            // {total: queryTotal()},
            // {niv0: queryNiv0()},
            // {niv1: queryNiv1()},
            // {niv2: queryNiv2()},
            // {niv3: queryNiv3()},
            // {niv4: queryNiv4()},
            // {niv5: queryNiv5()},
        ]);
    });

    
    closeConnect();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}${apiUrl}`);
});

// ! FUNCTIONS

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

function query(whereClause) {
    let array = [];
    db.query(
    `SET @row_number = 0;

    DROP TABLE IF EXISTS TAB;
    CREATE TEMPORARY TABLE TAB AS

    SELECT @row_number:=(@row_number + 1) AS num,
    login,
    LEFT(DATE_FORMAT(SEC_TO_TIME(complete_time), "%i:%s:%f"), 9) AS complete_time
    FROM SCORES S
    INNER JOIN GAMES G ON S.game_id = G.id
    INNER JOIN USERS U ON G.user_id = U.id
    WHERE ${whereClause}
    ORDER BY complete_time ASC;

    SELECT * FROM (SELECT * FROM TAB LIMIT 0,5) AS TAB1
    UNION ALL
    SELECT * FROM (SELECT * FROM TAB WHERE login = "${typeof login !== "undefined" ? login : ""}" LIMIT 0,1) AS TAB2;`,
        (err, result) => {
            if (err) { console.error(err); return; }

            for (const user of result[3]) {
                array.push({num: user["num"], name: user["login"], complete_time: user["complete_time"]});
            }
        }
    );
    return array;
}

function queryTotal(callback = (recordsTotal) => {}) {

    recordsTotal = query("S.level_id = 7");
    callback(recordsTotal);
}

function queryNiv0(callback = (recordsNiv0) => {}) {
    
    recordsNiv0 = query("S.level_id = 0");
    callback(recordsNiv0);
}

function queryNiv1(callback = (recordsNiv1) => {}) {
    
    recordsNiv1 = query("S.level_id = 1");
    callback(recordsNiv1);
}

function queryNiv2(callback = (recordsNiv2) => {}) {
    
    recordsNiv2 = query("S.level_id = 2");
    callback(recordsNiv2);
}

function queryNiv3(callback = (recordsNiv3) => {}) {
    
    recordsNiv3 = query("S.level_id = 3");
    callback(recordsNiv3);
}

function queryNiv4(callback = (recordsNiv4) => {}) {
    
    recordsNiv4 = query("S.level_id = 4");
    callback(recordsNiv4);
}

function queryNiv5(callback = (recordsNiv5) => {}) {
    
    recordsNiv5 = query("S.level_id = 5");
    callback(recordsNiv5);
}