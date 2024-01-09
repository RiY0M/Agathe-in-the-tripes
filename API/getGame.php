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
    $data["level_id"] = intval($data["level_id"]);
    $data["hp_remain"] = intval($data["hp_remain"]);
    $data["nb_dynamite"] = intval($data["nb_dynamite"]);

    $json["status"] = "success";
    $json["message"] = "Sélection réussie";
    $json["data"] = $data;

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);