-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 15, 2021 at 10:32 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `challenge`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `country`) VALUES
(1, 'John SRL', 'Russia'),
(2, 'Fran S.A', 'Peru'),
(6, 'Lucas SRL', 'Argentina'),
(10, 'Guido SA', 'Uruguay'),
(13, 'Jacob SA', 'USA');

-- --------------------------------------------------------

--
-- Table structure for table `display`
--

CREATE TABLE `display` (
  `id` int(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `company_id` int(255) NOT NULL,
  `latitude` decimal(50,4) NOT NULL,
  `longitude` decimal(50,4) NOT NULL,
  `type` enum('indoor','outdoor') NOT NULL,
  `price` decimal(50,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `display`
--

INSERT INTO `display` (`id`, `name`, `company_id`, `latitude`, `longitude`, `type`, `price`) VALUES
(21, 'Home 6', 6, '15.5600', '45.3456', 'indoor', '50'),
(23, '25', 1, '235.0000', '235.0000', 'indoor', '253'),
(25, 'Peter Studi0', 1, '234.0000', '1234.0000', 'indoor', '1234'),
(26, '345', 1, '4134.0000', '334.0000', 'indoor', '24'),
(27, 'asdf', 2, '123.0000', '23.0000', 'indoor', '1234'),
(28, '1342', 2, '1234.0000', '24.0000', 'indoor', '1234'),
(29, '34123', 2, '1234.0000', '1234.0000', 'indoor', '214'),
(30, 'TV Station 2', 2, '1234.0000', '1234.0000', 'indoor', '144'),
(31, 'Steve', 2, '22.0000', '234.0000', 'indoor', '23'),
(32, 'Waterfallall', 2, '234.0000', '234.0000', 'indoor', '1234'),
(33, 'test', 10, '235.0000', '341.0000', 'indoor', '234');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `display`
--
ALTER TABLE `display`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `display`
--
ALTER TABLE `display`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
