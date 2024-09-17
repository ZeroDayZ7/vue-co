-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 17, 2024 at 08:57 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crimscity`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `subject` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `email`, `subject`, `message`, `created_at`) VALUES
(1, 'matrix_neo@o2.pl', 'general_inquiry', '12', '2024-05-29 16:12:58');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `ids` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `access_token` varchar(512) DEFAULT NULL,
  `session_token` varchar(255) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`ids`, `email`, `access_token`, `session_token`, `login_date`) VALUES
(179, '77', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOjc3LCJzZXNzaW9uSWQiOiIwZDA3MjJiYy0wYmI5LTQyNWUtODVlMC1lOWExNDdjMmE2YzEiLCJyb2xlIjoiSEEiLCJpYXQiOjE3MjYzMzgwNjIsImV4cCI6MTcyNjM0MTY2Mn0.OaAKZQolUFE_PjrO03rpWEE170opd1G4sg_ys9nVSNw', '0d0722bc-0bb9-425e-85e0-e9a147c2a6c1', '2024-09-14 20:21:02');

-- --------------------------------------------------------

--
-- Table structure for table `sessions_store`
--

CREATE TABLE `sessions_store` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ids` int(11) NOT NULL,
  `email` varchar(88) COLLATE utf8_polish_ci DEFAULT NULL,
  `user` varchar(55) COLLATE utf8_polish_ci DEFAULT NULL,
  `pass` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `pin` int(11) DEFAULT NULL,
  `notifications` int(11) DEFAULT NULL,
  `activation_token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `reset_password_token` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `registration_date` datetime DEFAULT NULL,
  `login_count` int(11) DEFAULT '0',
  `role` varchar(10) COLLATE utf8_polish_ci DEFAULT NULL,
  `userBlock` tinyint(1) NOT NULL DEFAULT '0',
  `loginAttempts` int(11) DEFAULT '0',
  `lastLoginAttempt` datetime DEFAULT NULL,
  `lastLoginIp` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ids`, `email`, `user`, `pass`, `pin`, `notifications`, `activation_token`, `reset_password_token`, `login_date`, `registration_date`, `login_count`, `role`, `userBlock`, `loginAttempts`, `lastLoginAttempt`, `lastLoginIp`) VALUES
(1, 'abc@abc.pl', 'ADMIN11', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', 777, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjEsInJvbGUiOiJhZG1pbiIsInVzZXIiOiJBRE1JTjExIiwiZXhwIjoxNzE1MjU0MTMwLCJpYXQiOjE3MTUyNTA1MzB9.gqTPgr9lPFxFaR2mq4QUB5adI9vDYYY9DRZw_mlr0zk', NULL, '2024-05-09 12:28:50', NULL, 1037, 'admin', 0, 0, NULL, NULL),
(2, NULL, 'ADMIN111', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjIsInJvbGUiOiJhZG1pbjIiLCJ1c2VyIjoiQURNSU4xMTEiLCJleHAiOjE3MTUyMjAzOTUsImlhdCI6MTcxNTIxNjc5NX0.r1PzfBaJJSplfgoFyX4-YvAkFPqmovgUoA1cgv7CEfs', NULL, '2024-05-09 03:06:35', NULL, 18, 'admin2', 0, 0, NULL, NULL),
(3, NULL, 'ADMIN1', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHMiOjMsInJvbGUiOm51bGwsInVzZXIiOiJBRE1JTjEiLCJleHAiOjE3MDcwMzc0NjIsImlhdCI6MTcwNzAzMzg2Mn0.qiupxDDsYKOXjhZwJOGir9yBYDQa8c1PNkwYbc2NfiQ', NULL, '2024-02-04 09:04:22', NULL, NULL, NULL, 0, 0, NULL, NULL),
(4, NULL, '01585', '$2b$10$eMau1KnpQaBvqH7sTIx08OOmU4355hMgvfiw8OfaEdFQOXrQggRN2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(71, 'hesidak940@bsomek.com', NULL, '$2b$10$nhksDTDiaqH/RMniHpx86ejMoq8SVvvNOCs427QQPAYQeSnMcRy8e', NULL, NULL, NULL, 'GCcbKl4MMUFETTG16LVgWmi26yhKYm5hrM491VaN1UQWBFA8zw5TKVOm1XJuFKPb', '2024-05-30 06:47:18', '2024-05-15 08:56:11', 2, NULL, 0, 0, NULL, NULL),
(77, 'yovasec567@fincainc.com', NULL, '$2b$10$Hw9clcQtRnjoOFO8yo69He0gFkxfNfnAlzIq1P8YlASAAShdc/CCO', NULL, NULL, NULL, NULL, '2024-09-14 20:21:02', '2024-05-17 17:40:34', 398, 'HA', 0, 0, '2024-09-04 18:00:29', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `hire_date` date NOT NULL,
  `contract_type` varchar(50) NOT NULL,
  `hourly_rate` decimal(10,2) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isActive` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `hire_date`, `contract_type`, `hourly_rate`, `salary`, `created_at`, `updated_at`, `isActive`) VALUES
(1, 77, '2024-09-09', 'Full-time', 20.00, 4000.00, '2024-09-09 10:27:58', '2024-09-09 16:29:50', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`ids`);

--
-- Indexes for table `sessions_store`
--
ALTER TABLE `sessions_store`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ids`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ids` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ids`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
