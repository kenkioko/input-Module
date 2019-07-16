-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 16, 2019 at 03:20 PM
-- Server version: 5.7.26-0ubuntu0.19.04.1
-- PHP Version: 7.2.19-0ubuntu0.19.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `input_modal`
--

-- --------------------------------------------------------

--
-- Table structure for table `chosen_items`
--

CREATE TABLE `chosen_items` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logo_categories`
--

CREATE TABLE `logo_categories` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logo_items`
--

CREATE TABLE `logo_items` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image_src` varchar(100) NOT NULL,
  `img_alt` varchar(20) NOT NULL,
  `type` enum('logo','font') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logo_requests`
--

CREATE TABLE `logo_requests` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `line_1` varchar(100) NOT NULL,
  `line_2` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chosen_items`
--
ALTER TABLE `chosen_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `logo_categories`
--
ALTER TABLE `logo_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logo_items`
--
ALTER TABLE `logo_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logo_requests`
--
ALTER TABLE `logo_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chosen_items`
--
ALTER TABLE `chosen_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `logo_categories`
--
ALTER TABLE `logo_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `logo_items`
--
ALTER TABLE `logo_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `logo_requests`
--
ALTER TABLE `logo_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `chosen_items`
--
ALTER TABLE `chosen_items`
  ADD CONSTRAINT `chosen_items_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `logo_requests` (`id`),
  ADD CONSTRAINT `chosen_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `logo_items` (`id`);

--
-- Constraints for table `logo_requests`
--
ALTER TABLE `logo_requests`
  ADD CONSTRAINT `logo_requests_ibfk_1` FOREIGN KEY (`category`) REFERENCES `logo_categories` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
