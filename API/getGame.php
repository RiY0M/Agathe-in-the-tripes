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
    "SELECT id, level_id
    FROM GAMES
    WHERE user_id = :user_id
    ORDER BY id DESC;";

    $res = $db->prepare($query);
    $res->bindParam(":user_id", $_SESSION["user_id"], PDO::PARAM_INT);
    $res->execute();

    $data = $res->fetch();
    $data["id"] = intval($data["id"]);
    $_SESSION["game_id"] = $nextId;

    $json["status"] = "success";
    $json["message"] = "Sélection réussi";
    $json["data"] = $data;

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);