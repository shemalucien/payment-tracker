SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+02:00";

CREATE DATABASE
IF NOT EXISTS redco_db;

USE redco_db;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'member',
  `password` varchar(255) NOT NULL,
  `avatar` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `createdAt`, `updatedAt`, `email`, `firstName`, `lastName`, `role`, `password`, `avatar`) VALUES
(1, '2022-12-03 21:36:57.448317', '2023-02-12 00:17:11.000000', 'marie@rose.com', 'Maria', 'Rose', 'admin', '$2a$10$vd8EWHFOheceVN2fRnE5iebFHqDSDrxEI0Xq19Q0WRkapFDkyXc1O', 6),
(2, '2022-12-05 04:36:26.441214', '2023-02-12 00:19:38.000000', 'samuel@doe.com', 'Samuel', 'Doe', 'member', '$2a$10$sbIpIWBYnu3N2S2SSgVz/eEr81vtvAd/BcHqfvv2taYx1Km7BhVee', 9),
(3, '2022-12-18 19:51:30.352599', '2023-02-12 00:20:42.000000', 'anna@brown.com', 'Anna', 'Brown', 'member', '$2a$10$R.hCYstVO6yyPjTYMkeEIOeha4r8RXiVZ6cxMzmjJ39DoqWNAgUgm', 1);

-- --------------------------------------------------------


SELECT user,authentication_string,plugin,host FROM mysql.user;

-- Insert user with hashed password
CREATE USER 'admin'@'%' IDENTIFIED BY 'Kigali869762024@$';

-- Grant privileges to the user
GRANT ALL ON *.* TO 'admin'@'%' WITH GRANT OPTION;
