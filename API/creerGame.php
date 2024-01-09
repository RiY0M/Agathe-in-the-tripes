<?php declare(strict_types=1);

require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];

try {

    if(!isset($_POST["token"])) {
        throw new ErrorException("utilisateur non connecté, résultat non enregistré");
    }

    $query =
    "SELECT MAX(id)+1 AS next_id FROM GAMES";

    $res = $db->prepare($query);
    $res->execute();

    $nextId = intval($res->fetch()["next_id"]);

    $query =
    "SELECT id
    FROM USERS
    WHERE token = :token";

    $res = $db->prepare($query);
    $res->bindValue(":token", $_POST["token"] ?? '');
    $res->execute();
    $idUser = intval($res->fetch()["id"]);

    $query =
    "INSERT INTO GAMES (id, user_id, level_id, hp_remain, nb_dynamite)
    VALUES (:game_id, :user_id, 0, 3, 0);";

    $res = $db->prepare($query);
    $res->bindParam(":game_id", $nextId, PDO::PARAM_INT);
    $res->bindParam(":user_id", $idUser, PDO::PARAM_INT);
    $res->execute();

    $json["status"] = "success";
    $json["message"] = "Enregistrement réussi";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);