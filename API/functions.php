<?php declare(strict_types=1);

function getRandomStr(string $charsPossibles, int $length): string {

    $randomStr = "";

    for($i = 0; $i < $length; $i++) {
        $randomStr .= $charsPossibles[rand(0, strlen($charsPossibles)-1)];
    }

    return $randomStr;
}

function getRandomSalt(): string {

    return getRandomStr(' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~', 20);
}

function getRandomToken(): string {

    return getRandomStr('-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz', 20);
}

function tokenExists(PDO $db, string $token): bool {

    $query = 
    "SELECT COUNT(*) AS existing
    FROM USERS
    WHERE token = :token";

    $res = $db->prepare($query);
    $res->bindParam(":token", $token, PDO::PARAM_STR);

    return boolval($res->fetch()["existing"]);
}
