<?php declare(strict_types=1);

session_start();
require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];
$json["session"] = $_SESSION;

try {

    if(!isset($_SESSION["user_id"])) {
        throw new ErrorException("utilisateur non connecté, résultat non enregistré");
        return;
    }

    $query =
    "SELECT MAX(id)+1 AS next_id FROM GAMES";

    $res = $db->prepare($query);
    $res->execute();

    $nextId = intval($res->fetch()["next_id"]);
    $_SESSION["game_id"] = $nextId;

    $query =
    "INSERT INTO GAMES (id, user_id, level_id)
    VALUES (:game_id, :user_id, 0);";

    $res = $db->prepare($query);
    $res->bindParam(":game_id", $nextId, PDO::PARAM_INT);
    $res->bindParam(":level_id", $_SESSION["user_id"], PDO::PARAM_INT);
    $res->execute();

    $json["status"] = "success";
    $json["message"] = "Enregistrement réussi";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);