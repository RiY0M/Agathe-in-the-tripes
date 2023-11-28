<?php declare(strict_types=1);

require_once "./connexionBDD.php";
require_once "functions.php";

$json = [];

do{
    $salt = getRandomSalt();
    $password = crypt($_POST["mdp"], $salt);
}while($password == "*0");

$query =
"INSERT INTO USERS
(`id`, `login`, `mdp`, `salt`, `token`)
VALUES
(NULL, :login, :mdp, :salt, NULL)";

$res = $db->prepare($query);

$res->bindParam(':login', $_POST['login']);
$res->bindParam(':mdp', $password);
$res->bindParam(':salt', $salt);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";

} catch(Exception $exception) {
    $json["status"] = "Choisissez un autre pseudo";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);