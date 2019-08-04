-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 04, 2019 at 04:47 PM
-- Server version: 5.7.27
-- PHP Version: 7.2.19-0ubuntu0.19.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fantastic`
--

-- --------------------------------------------------------

--
-- Table structure for table `chosen_items`
--

CREATE TABLE `chosen_items` (
  `id` int(11) NOT NULL,
  `logo_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logos`
--

CREATE TABLE `logos` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `line_1` varchar(100) NOT NULL,
  `line_2` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `logo_categories`
--

CREATE TABLE `logo_categories` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logo_categories`
--

INSERT INTO `logo_categories` (`id`, `category`) VALUES
(3, 'Animals & Pets'),
(4, 'Automotive & Transportation'),
(5, 'Childcare & Education'),
(6, 'Entertainment, Art & Music'),
(7, 'Beauty & Massage'),
(8, 'Business & Consulting'),
(9, 'Construction & Contracting'),
(10, 'Family Services & Counseling'),
(11, 'Finance & Insurance'),
(12, 'Food, Beverage & Restaurant'),
(13, 'Health Care & Public Safety'),
(14, 'Holiday & Special Occasions'),
(15, 'Home Improvement & Cleaning'),
(16, 'Information Technology & Science'),
(17, 'IT/ Engineering'),
(18, 'Legal & Politics'),
(19, 'Marketing & Communications'),
(20, 'Real Estate'),
(21, 'Religious & Spiritual'),
(22, 'Retail & Sales'),
(23, 'Sports & Fitness'),
(24, 'Travel & Hospitality');

-- --------------------------------------------------------

--
-- Table structure for table `logo_items`
--

CREATE TABLE `logo_items` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `img_src` varchar(100) NOT NULL,
  `img_alt` varchar(20) NOT NULL,
  `type` enum('logo','font') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `posters`
--

CREATE TABLE `posters` (
  `id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `header` varchar(200) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `main` varchar(200) DEFAULT NULL,
  `footer` varchar(200) DEFAULT NULL,
  `background` varchar(200) DEFAULT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `poster_categories`
--

CREATE TABLE `poster_categories` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poster_categories`
--

INSERT INTO `poster_categories` (`id`, `category`) VALUES
(1, 'Advertising'),
(2, 'Political'),
(3, 'Movie'),
(4, 'Affirmation & Motivational'),
(5, 'Event'),
(6, 'Travel'),
(7, 'Educational'),
(8, 'Blacklight'),
(9, 'promotional'),
(10, 'Pin-up');

-- --------------------------------------------------------

--
-- Table structure for table `poster_images`
--

CREATE TABLE `poster_images` (
  `id` int(11) NOT NULL,
  `poster_id` int(11) NOT NULL,
  `dir` varchar(200) NOT NULL,
  `files` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `verified`) VALUES
(5, 'username', '$2y$10$SUR.L4oHsDGsKULeUeamYek/bBZwGe2oJy/LPhsmnLg093U8TCp9S', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chosen_items`
--
ALTER TABLE `chosen_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_id` (`logo_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

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
-- Indexes for table `posters`
--
ALTER TABLE `posters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `poster_categories`
--
ALTER TABLE `poster_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poster_images`
--
ALTER TABLE `poster_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poster` (`poster_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chosen_items`
--
ALTER TABLE `chosen_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logo_categories`
--
ALTER TABLE `logo_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `logo_items`
--
ALTER TABLE `logo_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posters`
--
ALTER TABLE `posters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `poster_categories`
--
ALTER TABLE `poster_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `poster_images`
--
ALTER TABLE `poster_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chosen_items`
--
ALTER TABLE `chosen_items`
  ADD CONSTRAINT `chosen_items_ibfk_1` FOREIGN KEY (`logo_id`) REFERENCES `logos` (`id`),
  ADD CONSTRAINT `chosen_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `logo_items` (`id`);

--
-- Constraints for table `logos`
--
ALTER TABLE `logos`
  ADD CONSTRAINT `logos_ibfk_1` FOREIGN KEY (`category`) REFERENCES `logo_categories` (`id`);

--
-- Constraints for table `posters`
--
ALTER TABLE `posters`
  ADD CONSTRAINT `posters_ibfk_1` FOREIGN KEY (`category`) REFERENCES `poster_categories` (`id`);

--
-- Constraints for table `poster_images`
--
ALTER TABLE `poster_images`
  ADD CONSTRAINT `poster_images_ibfk_1` FOREIGN KEY (`poster_id`) REFERENCES `posters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
