<?php declare(strict_types=1);

require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];

try {

    if(!$_COOKIE["token"]) {
        throw new ErrorException("utilisateur non connecté, résultat non enregistré");
    }
    
    $query =
    "SELECT G.id, level_id
    FROM GAMES G
    INNER JOIN USERS U ON U.user_id = G.id
    WHERE token = :token
    ORDER BY G.id DESC;";

    $res = $db->prepare($query);
    $res->bindParam(":token", $_COOKIE["token"], PDO::PARAM_STR);
    $res->execute();

    $data = $res->fetch();
    $data["id"] = intval($data["id"]);
    // $_SESSION["game_id"] = $nextId;

    $json["status"] = "success";
    $json["message"] = "Sélection réussie";
    $json["data"] = $data;

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);