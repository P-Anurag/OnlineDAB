-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2020 at 05:09 PM
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
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admincredentials`
--

INSERT INTO `admincredentials` (`AD_ID`, `EMAIL`, `PASSWORD`) VALUES
(1, 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `alldoctors`
--

CREATE TABLE `alldoctors` (
  `DOC_ID` bigint(20) NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `REGNO` varchar(20) NOT NULL,
  `SPECIALIZATION` varchar(20) NOT NULL,
  `LOCATION` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alldoctors`
--

INSERT INTO `alldoctors` (`DOC_ID`, `NAME`, `EMAIL`, `PHONE_NUMBER`, `REGNO`, `SPECIALIZATION`, `LOCATION`) VALUES
(86, 'abcd', 'abcd@gmail.com', 82365, 'reg121', 'abcd_spl', 'abcd_loc'),
(87, 'bcd', 'bcd@gmail.com', 34975347, 'reg12121', 'bcd_spl', 'bcd_loc'),
(0, 'doc13', 'doc13@gmail.com', 123454, 'dreg13', 'spl13', 'dloc13'),
(0, 'doc14', 'doc14@gmail.com', 123454, 'dreg14', 'spl14', 'dloc14'),
(0, 'doc15', 'doc15@gmail.com', 123454, 'dreg15', 'spl15', 'dloc15'),
(34, 'doc16', 'doc16@gmail.com', 123454, 'dreg16', 'spl16', 'dloc16'),
(36, 'doc17', 'doc17@gmail.com', 123454, 'dreg17', 'spl17', 'dloc17'),
(55, 'doc18', 'doc18@gmail.com', 123454, 'dreg18', 'spl18', 'dloc18'),
(0, 'doc19', 'doc19@gmail.com', 123454, 'dreg19', 'spl19', 'dloc19'),
(1, 'doc1', 'doc1@gmail.com', 123453798, 'dreg1', 'spl1', 'dloc1'),
(74, 'doc20', 'doc20@gmail.com', 123454, 'dreg20', 'spl20', 'dloc20'),
(80, 'doc21', 'doc21@gmail.com', 123454, 'dreg21', 'spl21', 'dloc21'),
(81, 'doc22', 'doc22@gmail.com', 123454, 'dreg22', 'spl22', 'dloc22'),
(82, 'doc23', 'doc23@gmail.com', 2525534, 'dreg23', 'spl23', 'dloc23'),
(0, 'doc24', 'doc24@gmail.com', 213423535, 'dreg24', 'spl24', 'dloc24'),
(85, 'doc25', 'doc25@gmail.com', 765879346, 'dreg25', 'spl25', 'dloc25'),
(2, 'doc2', 'doc2@gmail.com', 62354, 'dreg2', 'spl2', 'dloc2'),
(3, 'doc3', 'doc3@gmail.com', 364587, 'dreg3', 'spl3', 'dloc3'),
(4, 'doc4', 'doc4@gmail.com', 343, 'dreg4', 'spl4', 'dloc4'),
(5, 'doc5', 'doc5@gmail.com', 324324, 'dreg5', 'spl5', 'dloc5'),
(6, 'doc6', 'doc6@gmail.com', 9423659, 'dreg6', 'spl6', 'dloc6'),
(7, 'doc7', 'doc7@gmail.com', 86253, 'dreg7', 'spl7', 'dloc7'),
(9, 'doc8', 'doc8@gmail.com', 23523, 'dreg8', 'spl8', 'dloc8'),
(89, 'pqr', 'pqr@gmail.com', 347956497, 'reg135715', 'pqr_spl', 'pqr_loc'),
(88, 'zyx', 'zyx@gmail.com', 384638, 'reg26826', 'zyx_spl', 'zyx_loc');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `PATIENT_NAME` varchar(20) NOT NULL,
  `DATE` varchar(10) NOT NULL,
  `TIME` time NOT NULL,
  `DESCRIPTION` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`DOC_ID`, `PATIENT_ID`, `PATIENT_NAME`, `DATE`, `TIME`, `DESCRIPTION`) VALUES
(1, 1, 'pat1', '2020-06-25', '12:00:00', ''),
(1, 1, 'pat1', '2020-06-26', '18:00:00', ''),
(1, 3, 'pat3', '2020-06-20', '14:00:00', ''),
(1, 4, 'pat4', '2020-06-20', '16:00:00', ''),
(1, 5, 'pat5', '2020-06-20', '17:00:00', ''),
(2, 2, 'pat2', '2020-06-20', '15:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `confirmedappointments`
--

CREATE TABLE `confirmedappointments` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `PATIENT_NAME` varchar(20) NOT NULL,
  `PHONE_NUMBER` int(11) NOT NULL,
  `DATE` varchar(10) NOT NULL,
  `TIME` time NOT NULL,
  `DESCRIPTION` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `confirmedappointments`
--

INSERT INTO `confirmedappointments` (`DOC_ID`, `PATIENT_ID`, `PATIENT_NAME`, `PHONE_NUMBER`, `DATE`, `TIME`, `DESCRIPTION`) VALUES
(1, 1, 'pat1', 76475, '2020-06-19', '11:00:00', '');

-- --------------------------------------------------------

--
-- Table structure for table `doctorcredentials`
--

CREATE TABLE `doctorcredentials` (
  `DOC_ID` bigint(20) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctorcredentials`
--

INSERT INTO `doctorcredentials` (`DOC_ID`, `EMAIL`, `PASSWORD`) VALUES
(0, 'doc13@gmail.com', 'dpass13'),
(1, 'doc1@gmail.com', 'dpass1'),
(2, 'doc2@gmail.com', 'dpass2'),
(3, 'doc3@gmail.com', 'dpass3'),
(4, 'doc4@gmail.com', 'dpass4'),
(5, 'doc5@gmail.com', 'dpass5'),
(6, 'doc6@gmail.com', 'dpass6'),
(7, 'doc7@gmail.com', 'dpass7'),
(9, 'doc8@gmail.com', 'dpass8'),
(32, 'doc14@gmail.com', 'dpass14'),
(33, 'doc15@gmail.com', 'dpass15'),
(34, 'doc16@gmail.com', 'dpass16'),
(44, 'doc17@gmail.com', 'dpass17'),
(55, 'doc18@gmail.com', 'dpass18'),
(57, 'doc19@gmail.com', 'dpass19'),
(74, 'doc20@gmail.com', 'dpass20'),
(80, 'doc21@gmail.com', 'dpass21'),
(81, 'doc22@gmail.com', 'dpass22'),
(82, 'doc23@gmail.com', 'dpass23'),
(83, 'doc24@gmail.com', 'dpass24'),
(85, 'doc25@gmail.com', 'dpass24'),
(86, 'abcd@gmail.com', 'abcdp'),
(87, 'bcd@gmail.com', 'bcdp'),
(88, 'zyx@gmail.com', 'zyxp'),
(89, 'pqr@gmail.com', 'pqrp');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `SL_NO` bigint(20) UNSIGNED NOT NULL,
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `REMARK` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`SL_NO`, `DOC_ID`, `PATIENT_ID`, `REMARK`) VALUES
(1, 1, 1, 'Great service!!!'),
(2, 1, 1, 'GREAT ONE'),
(3, 1, 1, 'Awesome!!!'),
(4, 1, 1, 'wow'),
(5, 1, 1, 'excellent!!!'),
(6, 6, 3, 'nice');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `DOC_ID` bigint(20) NOT NULL,
  `PATIENT_ID` bigint(20) NOT NULL,
  `PATIENT_NAME` varchar(20) NOT NULL,
  `PHONE_NUMBER` int(11) NOT NULL,
  `DATE` varchar(10) NOT NULL,
  `TIME` time NOT NULL,
  `FEEDBACK` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`DOC_ID`, `PATIENT_ID`, `PATIENT_NAME`, `PHONE_NUMBER`, `DATE`, `TIME`, `FEEDBACK`) VALUES
(1, 1, 'pat1', 76475, '2020-06-23', '12:00:00', 1),
(1, 1, 'pat1', 76475, '2020-06-26', '10:00:00', 1),
(1, 1, 'pat1', 76475, '2020-07-03', '15:00:00', 1),
(6, 3, 'pat3', 76876876, '2020-06-25', '16:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `PATIENT_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `GENDER` varchar(7) NOT NULL,
  `DOB` varchar(10) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `MARITAL_STATUS` varchar(10) NOT NULL,
  `ADDRESS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`PATIENT_ID`, `NAME`, `GENDER`, `DOB`, `EMAIL`, `PHONE_NUMBER`, `MARITAL_STATUS`, `ADDRESS`) VALUES
(1, 'pat1', 'Male', '1999-04-29', 'pat1@gmail.com', 76475, 'Sin', 'ploc1'),
(2, 'pat2', 'Female', '1990-07-04', 'pat2@gmail.com', 653743647, 'Mar', 'ploc2'),
(3, 'pat3', 'Male', '2020-06-24', 'pat3@gmail.com', 76876876, 'Married', 'ploc3');

-- --------------------------------------------------------

--
-- Table structure for table `patientcredentials`
--

CREATE TABLE `patientcredentials` (
  `PATIENT_ID` int(11) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patientcredentials`
--

INSERT INTO `patientcredentials` (`PATIENT_ID`, `EMAIL`, `PASSWORD`) VALUES
(1, 'pat1@gmail.com', 'ppass1'),
(2, 'pat2@gmail.com', 'ppass2'),
(3, 'pat3@gmail.com', 'ppass3');

-- --------------------------------------------------------

--
-- Table structure for table `registerdoctor`
--

CREATE TABLE `registerdoctor` (
  `DOC_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `REGNO` varchar(20) NOT NULL,
  `SPECIALIZATION` varchar(20) NOT NULL,
  `LOCATION` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registerdoctor`
--

INSERT INTO `registerdoctor` (`DOC_ID`, `NAME`, `EMAIL`, `PHONE_NUMBER`, `REGNO`, `SPECIALIZATION`, `LOCATION`) VALUES
(86, 'abcd', 'abcd@gmail.com', 82365, 'reg121', 'abcd_spl', 'abcd_loc'),
(87, 'bcd', 'bcd@gmail.com', 34975347, 'reg12121', 'bcd_spl', 'bcd_loc'),
(88, 'zyx', 'zyx@gmail.com', 384638, 'reg26826', 'zyx_spl', 'zyx_loc'),
(89, 'pqr', 'pqr@gmail.com', 347956497, 'reg135715', 'pqr_spl', 'pqr_loc');

-- --------------------------------------------------------

--
-- Table structure for table `validdoctor`
--

CREATE TABLE `validdoctor` (
  `DOC_ID` bigint(20) UNSIGNED NOT NULL,
  `NAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `PHONE_NUMBER` bigint(20) NOT NULL,
  `REGNO` varchar(20) NOT NULL,
  `SPECIALIZATION` varchar(15) NOT NULL,
  `LOCATION` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `validdoctor`
--

INSERT INTO `validdoctor` (`DOC_ID`, `NAME`, `EMAIL`, `PHONE_NUMBER`, `REGNO`, `SPECIALIZATION`, `LOCATION`) VALUES
(1, 'doc1', '', 0, '0', 'spl1', 'dloc1'),
(2, 'doc2', 'doc2@gmail.com', 62354, '0', 'spl2', 'dloc2'),
(3, 'doc3', 'doc3@gmail.com', 364587, '0', 'spl3', 'dloc3'),
(4, 'doc4', 'doc4@gmail.com', 343, '0', 'spl4', 'dloc4'),
(5, 'doc5', 'doc5@gmail.com', 324324, '0', 'spl5', 'dloc5'),
(6, 'doc6', 'doc6@gmail.com', 9423659, '0', 'spl6', 'dloc6'),
(9, 'doc8', 'doc8@gmail.com', 23523, '0', 'spl8', 'dloc8'),
(10, 'doc7', 'doc7@gmail.com', 3224, '0', 'spl7', 'dloc7'),
(19, 'doc10', 'doc10@gmail.com', 123454, '0', 'spl10', 'dloc10'),
(27, 'doc11', 'doc11@gmail.com', 123454, '0', 'spl11', 'dloc11'),
(30, 'doc12', 'doc12@gmail.com', 123454, '0', 'spl12', 'dloc12'),
(61, 'doc19', 'doc19@gmail.com', 123454, '0', 'spl19', 'dloc19'),
(74, 'doc20', 'doc20@gmail.com', 123454, '0', 'spl20', 'dloc20'),
(82, 'doc23', 'doc23@gmail.com', 2525534, '0', 'spl23', 'dloc23'),
(83, 'doc24', 'doc24@gmail.com', 1375325, '0', 'spl24', 'dloc24'),
(85, 'doc25', 'doc25@gmail.com', 765879346, '0', 'spl25', 'dloc25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admincredentials`
--
ALTER TABLE `admincredentials`
  ADD UNIQUE KEY `ad_id` (`AD_ID`),
  ADD UNIQUE KEY `NAME` (`EMAIL`);

--
-- Indexes for table `alldoctors`
--
ALTER TABLE `alldoctors`
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`DOC_ID`,`PATIENT_ID`,`DATE`,`TIME`);

--
-- Indexes for table `confirmedappointments`
--
ALTER TABLE `confirmedappointments`
  ADD PRIMARY KEY (`DOC_ID`,`PATIENT_ID`,`DATE`,`TIME`);

--
-- Indexes for table `doctorcredentials`
--
ALTER TABLE `doctorcredentials`
  ADD UNIQUE KEY `DOC_ID` (`DOC_ID`),
  ADD UNIQUE KEY `NAME` (`EMAIL`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD UNIQUE KEY `SL_NO` (`SL_NO`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`DOC_ID`,`PATIENT_ID`,`DATE`,`TIME`);

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
  ADD UNIQUE KEY `NAME` (`EMAIL`);

--
-- Indexes for table `registerdoctor`
--
ALTER TABLE `registerdoctor`
  ADD UNIQUE KEY `id` (`DOC_ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indexes for table `validdoctor`
--
ALTER TABLE `validdoctor`
  ADD UNIQUE KEY `DOC_ID` (`DOC_ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admincredentials`
--
ALTER TABLE `admincredentials`
  MODIFY `AD_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `SL_NO` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `PATIENT_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patientcredentials`
--
ALTER TABLE `patientcredentials`
  MODIFY `PATIENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `registerdoctor`
--
ALTER TABLE `registerdoctor`
  MODIFY `DOC_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `validdoctor`
--
ALTER TABLE `validdoctor`
  MODIFY `DOC_ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
