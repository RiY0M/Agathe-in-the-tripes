<?php declare(strict_types=1);

require_once "./connexionBDD.php";
require_once "functions.php";

$json = [];

do{
    $salt = getRandomSalt();
    $password = crypt($_POST["mdp"], $salt);
} while($password == "*0");

do {
    $token = getRandomToken();
} while (tokenExists($db, $token));

$query =
"INSERT INTO USERS
(`id`, `login`, `mdp`, `salt`, `token`)
VALUES
(NULL, :login, :mdp, :salt, :token)";

$res = $db->prepare($query);

$res->bindParam(':login', $_POST['login'], PDO::PARAM_STR);
$res->bindParam(':mdp', $password, PDO::PARAM_STR);
$res->bindParam(':salt', $salt, PDO::PARAM_STR);
$res->bindParam(':token', $token, PDO::PARAM_STR);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";

} catch(Exception $exception) {
    $json["status"] = "Choisissez un autre pseudo";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);
