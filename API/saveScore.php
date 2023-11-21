<?php declare(strict_types=1);

session_start();
require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];

try {

    if(!$_SESSION["game_id"]) {
        throw new ErrorException("utilisateur non connecté, résultat non enregistré");
        return;
    }

    $query =
    "REPLACE INTO GAMES (id, user_id, level_id)
    VALUES (:id, :user_id, :level_id);";

    $res = $db->prepare($query);
    $res->bindParam(":id", $_SESSION["game_id"], PDO::PARAM_INT);
    $res->bindParam(":user_id", $_SESSION["user_id"], PDO::PARAM_INT);
    $res->bindParam(":level_id", $_POST["next_level_id"], PDO::PARAM_INT);
    $res->execute();

    $query =
    "INSERT INTO SCORES (game_id, level_id, complete_time)
    VALUES (:game_id, :level_id, :complete_time);";

    $res = $db->prepare($query);
    $res->bindParam(":game_id", $_SESSION["game_id"], PDO::PARAM_INT);
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