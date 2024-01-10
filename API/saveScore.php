<?php declare(strict_types=1);

require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];

try {
    $query =
    "SELECT MAX(G.id) AS game_id, U.id AS user_id, hp_remain
    FROM GAMES G
    INNER JOIN USERS U ON U.id = G.user_id
    WHERE token = :token";

    $res = $db->prepare($query);
    $res->bindValue(":token", $_POST["token"] ?? '', PDO::PARAM_STR);
    $res->execute();
    
    $data = $res->fetch(PDO::FETCH_OBJ);
    $idGame = intval($data->game_id ?? null);
    $idUser = intval($data->user_id ?? null);
    $hpRemain = intval($_POST["hp_remain"] ?? $data->hp_remain ?? 3);
    $nbDynamite = intval($data->nb_dynamite ?? 0) + intval($_POST["nb_dynamite"] ?? 0);

    $idNextLvl = intval($_POST["next_level_id"] ?? 7);

    $json["data"]["level_id"] = $idNextLvl;
    $json["data"]["hpRemain"] = $hpRemain;
    $json["data"]["nbDynamite"] = $nbDynamite;

    if(!$_POST["token"]) {
        throw new Exception("Utilisateur non connecté, résultat non enregistré");
    }

    $query =
    "REPLACE INTO GAMES (id, user_id, level_id, hp_remain, nb_dynamite)
    VALUES (:id, :user_id, :level_id, :hp_remain, :nb_dynamite);";

    $res = $db->prepare($query);
    $res->bindParam(":id", $idGame, PDO::PARAM_INT);
    $res->bindParam(":user_id", $idUser, PDO::PARAM_INT);
    $res->bindParam(":level_id", $idNextLvl, PDO::PARAM_INT);
    $res->bindParam(":hp_remain", $hpRemain, PDO::PARAM_INT);
    $res->bindParam(":nb_dynamite", $nbDynamite, PDO::PARAM_INT);
    $res->execute();

    $query =
    "INSERT INTO SCORES (game_id, level_id, complete_time)
    VALUES (:game_id, :level_id, :complete_time);";

    $res = $db->prepare($query);
    $res->bindValue(":game_id", $idGame, PDO::PARAM_INT);
    $res->bindParam(":level_id", $_POST["level_id"], PDO::PARAM_INT);
    $res->bindParam(":complete_time", $_POST["complete_time"]);
    $res->execute();

    if($idNextLvl == 7) {
        $query =
        "INSERT INTO SCORES (game_id, level_id, complete_time)
        VALUES (:game_id, 7, 
            (SELECT SUM(S1.complete_time) as complete_time FROM `SCORES` S1 WHERE S1.game_id = :game_id)
        )";
        // Invalid number of parameters
        $res = $db->prepare($query);
        $res->bindValue(":game_id", $idGame, PDO::PARAM_INT);
        $res->execute();
    }

    $json["status"] = "success";
    $json["message"] = "Enregistrement réussi";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);