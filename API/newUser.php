<?php declare(strict_types=1);

require_once '../API/connexionBDD.php';
require_once 'header.php';


function get_random_chaine(): string {

    $salt = "";
    $chars_possibles = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

    for($i = 0; $i < 20; $i++) {
        $salt .= $chars_possibles[rand(0, strlen($chars_possibles)-1)];
    }

    return $salt;
}

$json = [];

do{
    $salt = get_random_chaine();
    $password = crypt($_POST["mdp"], $salt);
}while($password == "*0");

$query =
"INSERT INTO USERS
(`id`, `login`, `mdp`, `salt`)
VALUES
(NULL, :login, :mdp, :salt)";

$res = $db->prepare($query);

$res->bindParam(':login', $_POST['login']);
$res->bindParam(':mdp', $password);
$res->bindParam(':salt', $salt);

try {
    $res->execute();
    $json["status"] = "success";
    $json["message"] = "Insertion réussie";

} catch(Exception $exception) {
    $json["status"] = "error";
    $json["message"] = $exception->getMessage();
}


echo json_encode($json);