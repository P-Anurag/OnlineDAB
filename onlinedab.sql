-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2020 at 07:47 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinedab`
--

-- --------------------------------------------------------

--
-- Table structure for table `admincredentials`
--

CREATE TABLE `admincredentials` (
  `AD_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `TIME` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctorcredentials`
--

CREATE TABLE `doctorcredentials` (
  `DOC_ID` bigint(20) NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `PATIENT_ID` bigint(20) NOT NULL,
  `DOC_NAME` varchar(20) NOT NULL,
  `REMARK` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `PATIENT_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `GENDER` varchar(7) NOT NULL,
  `DOB` date NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `MARITAL_STATUS` varchar(3) NOT NULL,
  `ADDRESS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patientcredentials`
--

CREATE TABLE `patientcredentials` (
  `PATIENT_ID` int(11) NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `registerdoctor`
--

CREATE TABLE `registerdoctor` (
  `DOC_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `REGNO` int(11) NOT NULL,
  `SPECIALIZATION` varchar(20) NOT NULL,
  `LOCATION` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `validdoctor`
--

CREATE TABLE `validdoctor` (
  `DOC_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `REGNO` int(11) NOT NULL,
  `SPECIALIZATION` varchar(15) NOT NULL,
  `LOCATION` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admincredentials`
--
ALTER TABLE `admincredentials`
  ADD UNIQUE KEY `ad_id` (`AD_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `doctorcredentials`
--
ALTER TABLE `doctorcredentials`
  ADD UNIQUE KEY `DOC_ID` (`DOC_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD UNIQUE KEY `PATIENT_ID` (`PATIENT_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `patientcredentials`
--
ALTER TABLE `patientcredentials`
  ADD PRIMARY KEY (`PATIENT_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `registerdoctor`
--
ALTER TABLE `registerdoctor`
  ADD UNIQUE KEY `id` (`DOC_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `validdoctor`
--
ALTER TABLE `validdoctor`
  ADD UNIQUE KEY `DOC_ID` (`DOC_ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admincredentials`
--
ALTER TABLE `admincredentials`
  MODIFY `AD_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `PATIENT_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patientcredentials`
--
ALTER TABLE `patientcredentials`
  MODIFY `PATIENT_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `registerdoctor`
--
ALTER TABLE `registerdoctor`
  MODIFY `DOC_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `validdoctor`
--
ALTER TABLE `validdoctor`
  MODIFY `DOC_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
