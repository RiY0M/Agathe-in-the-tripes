<?php

require_once "./connexionBDD.php";
require_once "functions.php";

$json = [];

$query = "
SELECT id, mdp, salt, token
FROM USERS
WHERE login = :login";

$res = $db->prepare($query);

$res->bindParam(':login', $_POST['login']);
try{
    $res->execute();
    $res = $res->fetch();
    $mdp = crypt($_POST['mdp'], $res['salt']);
    $id = intval($res["id"]);

    if($mdp == $res['mdp']){
        $json["status"] = "success";
        $json["message"] = "Connexion réussie";
        $json["data"]["token"] = $res["token"];
        setcookie("token", $res["token"], time() + 86400 * 365);
        setcookie("login", $_POST["login"], time() + 86400 * 365);
        // $_SESSION["user_id"] = $id;
        // $json["session_id"] = session_id();
        // // $json["session"] = $id;
        // // $json["session"] = $_SESSION;
    }
    else{
        $json["status"] = "failed";
        $json["message"] = "Pseudo ou mot de passe incorrect";
    }
}
catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);