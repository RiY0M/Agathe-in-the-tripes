<?php
    require_once "./connexionBDD.php";

$json = [];
$query = "
SELECT mdp, salt
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
    }
    else{
        $json["status"] = "failed";
        $json["message"] = "Mauvais mot de passe";
    }
}
catch(Exception $exception){
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}

echo json_encode($json);