<?php declare(strict_types=1);

require_once "./connexionBDD.php";

function queryBasic(PDO $db, string $whereClause): array {

    $query =
    "SET @row_number = 0;

    DROP TABLE IF EXISTS TAB;
    CREATE TEMPORARY TABLE TAB AS

    SELECT @row_number:=@row_number+1 AS num,
    login AS name,
    G.user_id,
    token
    LEFT(DATE_FORMAT(SEC_TO_TIME(complete_time), '%i:%s:%f'), 9) AS complete_time
    FROM SCORES S
    INNER JOIN GAMES G ON S.game_id = G.id
    INNER JOIN USERS U ON G.user_id = U.id
    WHERE $whereClause
    ORDER BY complete_time ASC;";

    $res = $db->query($query);

    $query =
    "SELECT * FROM (SELECT * FROM TAB LIMIT 0,5) AS TAB1
    UNION ALL
    SELECT * FROM (SELECT * FROM TAB WHERE token = :token LIMIT 0,1) AS TAB2";

    $res = $db->prepare($query);
    $res->bindParam(":token", $_COOKIE["token"], PDO::PARAM_STR);
    $res->execute();

    $data = $res->fetchAll(PDO::FETCH_ASSOC);

    return $data;
}

function queryLevels(PDO $db): array {

    $query = "SELECT * FROM LEVELS";

    $res = $db->prepare($query);
    $res->execute();

    return $res->fetchAll(PDO::FETCH_ASSOC);
} 

// $login = $_SESSION["user_id"] ?? 0;

$json = [];
try {
    $json["data"] = [
        "levels" => queryLevels($db),
        "niv7" => queryBasic($db, "S.level_id = 7", $login),
        "niv0" => queryBasic($db, "S.level_id = 0", $login),
        "niv1" => queryBasic($db, "S.level_id = 1", $login),
        "niv2" => queryBasic($db, "S.level_id = 2", $login),
        "niv3" => queryBasic($db, "S.level_id = 3", $login),
        "niv4" => queryBasic($db, "S.level_id = 4", $login),
        "niv5" => queryBasic($db, "S.level_id = 5", $login),
    ];

    $json["status"] = "success";
    $json["message"] = "Sélection réussie";

} catch(Exception $exception) {
    $json["data"] = [];
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);