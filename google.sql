-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 10, 2023 at 07:50 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `google`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `googleID` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `googleID`, `date`, `thumbnail`, `email`, `password`) VALUES
(1, '劉又壬', '100427292115291492070', '2023-10-07 10:12:26', 'https://lh3.googleusercontent.com/a/ACg8ocJ8B9OFZwTbxSZQhL9_ZB7efRKIgziLIJmZ2Hrg74ioDA=s96-c', 'wbcwbc1616@gmail.com', NULL),
(4, 'kevin rufolf', NULL, '2023-10-08 05:05:52', NULL, 'kevin@gmail.com', '$2b$10$yo5sNrR0GpMhri6IgyjCt.RpMPYMtMaOVDH.VoWgt/gVx4bT1BeA.'),
(5, 'kevin grant', NULL, '2023-10-08 05:11:57', NULL, 'kevin999@gmail.com', '$2b$10$hNQ7ZjFsh19VghPPGJ8h2.1mNfFmOMGjpado3qML9Pljownf3hqKC'),
(6, 'kevin garnet', NULL, '2023-10-08 05:34:43', NULL, 'kevingar999@gmail.com', '$2b$10$yxePiwrA6edsV68XNPKq/epToBoCCwP/i2ySqqSCUzPXNp5rVqQmm'),
(7, 'kevin scott', NULL, '2023-10-08 05:36:02', NULL, 'kevinscott999@gmail.com', '$2b$10$jWtyTrgZblHpMdLB097kDOUaCwM1RpSnFPtLt4fqq/grT8g.oTNt2'),
(8, 'james brown', NULL, '2023-10-08 06:28:37', NULL, 'jamesbrownfunk@gmail.com', '$2b$10$jY1Qic8rsfPXRoXfy2e.leQR/b0ajSXwa9fcyG8vP8Ll.1evh.XMW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
