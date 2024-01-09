<?php declare(strict_types=1);

require_once "./connexionBDD.php";

$json = [];
$json["data"] = [];

try {

    if(!$_POST["token"]) {
        throw new ErrorException("utilisateur non connecté, résultat non enregistré");
    }
    
    $query =
    "SELECT level_id, hp_remain, nb_dynamite
    FROM GAMES G
    INNER JOIN USERS U ON U.id = G.user_id
    WHERE token = :token
    ORDER BY G.id DESC;";

    $res = $db->prepare($query);
    $res->bindValue(":token", $_POST["token"] ?? '', PDO::PARAM_STR);
    $res->execute();

    $data = $res->fetch();
    $data["level_id"] = intval($data["level_id"] ?? $_POST["level_id"] ?? 0);
    $data["hpRemain"] = intval($data["hp_remain"] ?? $_POST["hp_remain"] ?? 3);
    $data["nbDynamite"] = intval($data["nb_dynamite"] ?? $_POST["nb_dynamite"] ?? 0);

    $json["status"] = "success";
    $json["message"] = "Sélection réussie";
    $json["data"] = $data;

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);