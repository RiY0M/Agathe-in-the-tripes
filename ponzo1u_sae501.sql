-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : devbdd.iutmetz.univ-lorraine.fr
-- Généré le : mar. 23 jan. 2024 à 08:40
-- Version du serveur : 10.3.39-MariaDB
-- Version de PHP : 8.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ponzo1u_sae501`
--

-- --------------------------------------------------------

--
-- Structure de la table `GAMES`
--

CREATE TABLE `GAMES` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `hp_remain` int(11) NOT NULL DEFAULT 3,
  `nb_dynamite` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `GAMES`
--

INSERT INTO `GAMES` (`id`, `user_id`, `level_id`, `hp_remain`, `nb_dynamite`) VALUES
(1, 1, 8, 3, 0),
(2, 3, 1, 3, 0),
(3, 13, 0, 3, 0),
(4, 13, 0, 3, 0),
(5, 15, 0, 3, 0),
(6, 14, 0, 3, 0),
(7, 14, 0, 3, 0),
(8, 15, 0, 3, 0),
(9, 14, 0, 3, 0),
(10, 3, 2, 1, 1),
(11, 3, 6, 3, 0),
(12, 3, 6, 2, 0),
(13, 3, 0, 3, 0),
(14, 3, 6, 2, 0),
(15, 16, 2, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `LEVELS`
--

CREATE TABLE `LEVELS` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `LEVELS`
--

INSERT INTO `LEVELS` (`id`, `name`) VALUES
(0, 'La forêt'),
(1, 'La bouche'),
(2, 'L\'œsophage'),
(3, 'L\'estomac'),
(4, 'L\'intestin'),
(5, 'L\'anus'),
(6, 'Préparation'),
(7, 'Boss'),
(8, 'Partie complète');

-- --------------------------------------------------------

--
-- Structure de la table `SCORES`
--

CREATE TABLE `SCORES` (
  `game_id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `complete_time` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `SCORES`
--

INSERT INTO `SCORES` (`game_id`, `level_id`, `complete_time`) VALUES
(1, 0, 21.76),
(1, 1, 45),
(1, 2, 45),
(1, 3, 76),
(1, 4, 84),
(1, 5, 96),
(2, 0, 6.866),
(10, 0, 13.667),
(10, 1, 50.726),
(11, 5, 38.562),
(12, 0, 7.394),
(12, 1, 38.461),
(12, 2, 19.923),
(12, 3, 41.375),
(12, 4, 36.225),
(12, 5, 54.808),
(14, 0, 8.469),
(14, 1, 39.493),
(14, 2, 18.868),
(14, 3, 41.404),
(14, 4, 38.637),
(14, 5, 41.522),
(15, 0, 35.517),
(15, 1, 3154.37);

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE `USERS` (
  `id` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `mdp` varchar(30) NOT NULL,
  `salt` varchar(25) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `USERS`
--

INSERT INTO `USERS` (`id`, `login`, `mdp`, `salt`, `token`) VALUES
(1, 'admin', 'password', NULL, NULL),
(2, 'adm', 'adm', NULL, NULL),
(3, 'rdm', '3a0Kh1cyn.OQk', '3aFknY&)q+wT /!.\'Xm0', 'uMUnkKkrkkWSPvs5dLDM'),
(4, 'test', 'YgoB2RIMQIrL2', 'Yghw9]8c HtzFOX}o3e`', NULL),
(9, 'ZENvZGU=', 'RJoqDpHBQiPdQ', 'RJi_AimYC@kUE+*SlSc\'', NULL),
(10, 'Tani Soe', 'W3flj9RSLAB56', 'W3yhXzABxiUUYO>=0#vQ', NULL),
(11, 'test2', 'p0DfAAW1mibNg', 'p0&t!6PLd{Alsin2jfl9', 'dhoG62n0ZtfgpBUs3ym0'),
(12, 'test1', 'W8/Qrir.gDWQM', 'W80=x6T$hlf`f-#!<|qs', 'amjIYoafCcqAbGRMCztg'),
(13, 'test0', '6hUc6Q/.aQWD6', '6hv;*rTE=gn@!_2rV$!7', 'NNzihkhmxyVp1QMeyDVo'),
(14, 'test3', 'Y4yDIG4wTir/6', 'Y4r{LlRfd-KP<>~wR7gr', 'IQ9ilsw46IcY2Eo69hy7'),
(15, 'LLazry', 'eM5UI0jHoaVKM', 'eMP\\{=`E\'};gIDy`0B*G', '167x_FpOZMGrCv-Hrgyz'),
(16, 'raspoutine', 'PCqtuXj8D941I', 'PC)s0(HR&sXrX[ouNlJW', '59tRfnRvB-MkMsvWUkqg');

--
-- Déclencheurs `USERS`
--
DELIMITER $$
CREATE TRIGGER `Login_Distinct` BEFORE INSERT ON `USERS` FOR EACH ROW BEGIN
    DECLARE compteur INT;
    
    SELECT COUNT(*) INTO compteur
    FROM USERS
    WHERE USERS.login = NEW.login;
    
    IF compteur > 0 THEN
    SIGNAL SQLSTATE '45001'
        SET MESSAGE_TEXT = 'Login déjà utilisé.';
    END IF;
END
$$
DELIMITER ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `GAMES`
--
ALTER TABLE `GAMES`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `LEVELS`
--
ALTER TABLE `LEVELS`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `SCORES`
--
ALTER TABLE `SCORES`
  ADD PRIMARY KEY (`game_id`,`level_id`);

--
-- Index pour la table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `GAMES`
--
ALTER TABLE `GAMES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1478;

--
-- AUTO_INCREMENT pour la table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `GAMES`
--
ALTER TABLE `GAMES`
  ADD CONSTRAINT `GAMES_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `LEVELS` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `GAMES_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
