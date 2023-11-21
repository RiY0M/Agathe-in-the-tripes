<?php

session_start();
require_once "./connexionBDD.php";

$json = [];
$query = "
SELECT user_id, mdp, salt
FROM USERS
WHERE login = :login";

$res = $db->prepare($query);

$res->bindParam(':login', $_POST['login']);
try{
    $res->execute();
    $res = $res->fetch();
    $mdp = crypt($_POST['mdp'], $res['salt']);

    if($mdp == $res['mdp']){
        $json["message"] = "Connexion réussie";
        $_SESSION["user_id"] = intval($res["user_id"]);
    }
    else{
        $json["status"] = "failed";
        $json["message"] = "Pseudo ou mot de passe incorrect";
    }
}
catch(Exception $exception){
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);