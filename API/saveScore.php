<?php declare(strict_types=1);

require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];

try {

    if(!$_COOKIE["token"]) {
        throw new ErrorException("Utilisateur non connecté, résultat non enregistré");
    }

    $query =
    "SELECT MAX(G.id) AS game_id, U.id AS user_id
    FROM GAMES G
    INNER JOIN USERS U ON U.id = G.user_id
    WHERE token = :token";

    $res = $db->prepare($query);
    $res->bindParam(":token", $_COOKIE["token"], PDO::PARAM_STR);
    $data = $res->fetch(PDO::FETCH_ASSOC);
    $idGame = $data->game_id;
    $idUser = $data->user_id;

    $query =
    "REPLACE INTO GAMES (id, user_id, level_id)
    VALUES (:id, :user_id, :level_id);";

    $res = $db->prepare($query);
    $res->bindParam(":id", $idGame, PDO::PARAM_INT);
    $res->bindParam(":user_id", $idUser, PDO::PARAM_INT);
    $res->bindParam(":level_id", $_POST["next_level_id"], PDO::PARAM_INT);
    $res->execute();

    $query =
    "INSERT INTO SCORES (game_id, level_id, complete_time)
    VALUES (:game_id, :level_id, :complete_time);";

    $res = $db->prepare($query);
    $res->bindParam(":game_id", $idGame, PDO::PARAM_INT);
    $res->bindParam(":level_id", $_POST["level_id"], PDO::PARAM_INT);
    $res->bindParam(":complete_time", $_POST["complete_time"]);
    $res->execute();

    $json["status"] = "success";
    $json["message"] = "Enregistrement réussi";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);