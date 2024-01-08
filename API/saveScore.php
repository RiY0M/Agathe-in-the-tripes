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
    $res->bindParam(":token", $_COOKIE["token"] ?? null, PDO::PARAM_STR);
    $data = $res->fetch(PDO::FETCH_ASSOC);
    $idGame = intval($data->game_id);
    $idUser = intval($data->user_id);
    $hpRemain = $_POST["hp_remain"] ?? $data->hpRemain ?? $_COOKIE["hpRemain"];
    $nbDynamite = ($data->nbDynamite ?? $_COOKIE["nbDynamite"]) + intval($_POST["get_dynamite"]);

    setcookie("hpRemain", $hpRemain, time() + 86400 * 365, "/");
    setcookie("nbDynamite", $nbDynamite, time() + 86400 * 365, "/");
    setcookie("idLvl", $_POST["next_level_id"], time() + 86400 * 365, "/");

    if(!$_COOKIE["token"]) {
        throw new ErrorException("Utilisateur non connecté, résultat non enregistré");
    }

    $query =
    "REPLACE INTO GAMES (id, user_id, level_id, hp_remain, nb_dynamite)
    VALUES (:id, :user_id, :level_id, :hp_remain, :nb_dynamite);";

    $res = $db->prepare($query);
    $res->bindParam(":id", $idGame, PDO::PARAM_INT);
    $res->bindParam(":user_id", $idUser, PDO::PARAM_INT);
    $res->bindParam(":level_id", $_POST["next_level_id"], PDO::PARAM_INT);
    $res->bindParam(":hp_remain", $hpRemain, PDO::PARAM_INT);
    $res->bindParam(":nb_dynamite", $nbDynamite, PDO::PARAM_INT);
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