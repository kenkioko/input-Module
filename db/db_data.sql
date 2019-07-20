-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 19, 2019 at 11:52 PM
-- Server version: 5.7.26
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
  `type` varchar(100) DEFAULT NULL
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

--
-- Dumping data for table `logo_items`
--

INSERT INTO `logo_items` (`id`, `name`, `description`, `img_src`, `img_alt`, `type`) VALUES
(5, 'Initial', 'Emphasize one letter in your name. ', 'type_initial.jpg\r\n', 'initial logo', 'logo'),
(6, 'Icon', 'Feature an icon related to your business. ', 'type_icon.jpg', 'icon logo', 'logo'),
(7, 'Badge', 'Place your text inside a badge design. ', 'type_badge.jpg\r\n', 'badge logo', 'logo'),
(8, 'Text', 'Use font to define your brand. ', 'type_text.jpg\r\n', 'text logo', 'logo'),
(9, 'Sans Serif', 'Modern fonts with straight lines. ', ' font_sanserif.jpg ', 'sans serif font', 'font'),
(10, 'Serif', 'Traditional fonts with embellishments. ', 'font_serif.jpg', 'serif font', 'font'),
(11, 'Script', 'Elegant handwritten fonts. ', 'font_script.jpg', 'script font', 'font'),
(12, 'Display', 'Bold fonts with a unique style. ', 'font_display.jpg', 'display font', 'font');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chosen_items`
--
ALTER TABLE `chosen_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `logo_categories`
--
ALTER TABLE `logo_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `logo_items`
--
ALTER TABLE `logo_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
