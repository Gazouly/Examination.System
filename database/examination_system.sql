-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2018 at 02:09 PM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `examination_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `Course_ID` int(11) NOT NULL,
  `Course_name` varchar(15) CHARACTER SET utf8 NOT NULL,
  `Dept_ID` int(11) NOT NULL,
  `Level` varchar(15) CHARACTER SET utf8 NOT NULL,
  `Midterm_degree` int(11) NOT NULL,
  `Final_degree` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`Course_ID`, `Course_name`, `Dept_ID`, `Level`, `Midterm_degree`, `Final_degree`) VALUES
(1, 'Circuit', 1, '2nd grade', 50, 100),
(2, 'Field', 1, '2nd grade', 50, 100),
(3, 'Electronics', 1, '2nd grade', 50, 100),
(4, 'Strcuture', 2, '2nd grade', 50, 100),
(5, 'Steel', 2, '2nd grade', 50, 100);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `Dept_ID` int(11) NOT NULL,
  `Dept_NAME` varchar(35) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Dept_ID`, `Dept_NAME`) VALUES
(1, 'Electrical'),
(2, 'Civil'),
(3, 'Architecture');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `SSN` varchar(14) CHARACTER SET utf8 NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Email` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(35) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`SSN`, `Name`, `Email`, `Password`) VALUES
('12345678910114', 'ahmed', 'ahmed', '123456'),
('14785236974125', 'hossam', 'hossam', '96587458'),
('96384125447815', 'mohamed', 'mohamed', '963258');

-- --------------------------------------------------------

--
-- Table structure for table `q_bank`
--

CREATE TABLE `q_bank` (
  `Q_ID` int(11) NOT NULL,
  `Q_type` varchar(10) CHARACTER SET utf8 NOT NULL,
  `Question` varchar(250) CHARACTER SET utf8 NOT NULL,
  `correct answer` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Q_Ans1` varchar(15) CHARACTER SET utf8 NOT NULL,
  `Q_Ans2` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `Q_Ans3` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `Q_Ans4` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `Course_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_bank`
--

INSERT INTO `q_bank` (`Q_ID`, `Q_type`, `Question`, `correct answer`, `Q_Ans1`, `Q_Ans2`, `Q_Ans3`, `Q_Ans4`, `Course_ID`) VALUES
(1, 'mcq', 'magnetic field is ....... field', 'electric', 'electric', 'force', 'both', 'none', 2),
(2, 'TOF', 'Is short circuit bad', 'true', 'true', NULL, NULL, NULL, 1),
(3, 'complete', 'The sum of voltages in close loop equals ......', 'zero', 'zero', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `SSN` varchar(14) CHARACTER SET utf8 NOT NULL,
  `Name` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Dept_ID` int(11) NOT NULL,
  `Title` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Email` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(35) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`SSN`, `Name`, `Dept_ID`, `Title`, `Email`, `Password`) VALUES
('78549658743212', 'abdo', 2, 'prof', 'abdo', '958745876'),
('85469712584697', 'seif', 2, 'prof.', 'seif', '874596258'),
('95874586321869', 'abc', 3, 'prof.', 'abc', '165156165'),
('96384179165815', 'mahmoud', 1, 'prof', 'mahmoud', '9874563'),
('98563214785493', 'said', 1, 'prof.', 'said', '12345685');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `SSN` varchar(14) CHARACTER SET utf8 NOT NULL,
  `Name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Dept_ID` int(11) NOT NULL,
  `Email` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(35) CHARACTER SET utf8 NOT NULL,
  `Level` varchar(50) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`SSN`, `Name`, `Dept_ID`, `Email`, `Password`, `Level`) VALUES
('01234567890123', 'Ahmed Hamdy', 1, 'Hamdimn54@gmail.com', '123456789A', '3'),
('12345678965432', 'Mohammed', 1, 'm.algazouly@gmail.com', '123456789G', '3'),
('12365412365402', 'Hossam', 1, 'hossam@gmail.com', '123456789H', '3'),
('32165498765412', 'Abdo', 2, 'abdo@gmail.com', '123456789mm', '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`Course_ID`),
  ADD UNIQUE KEY `Course_ID` (`Course_ID`),
  ADD KEY `Dept_ID` (`Dept_ID`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`Dept_ID`),
  ADD UNIQUE KEY `Dept_ID` (`Dept_ID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`SSN`),
  ADD UNIQUE KEY `SSN` (`SSN`);

--
-- Indexes for table `q_bank`
--
ALTER TABLE `q_bank`
  ADD PRIMARY KEY (`Q_ID`),
  ADD UNIQUE KEY `Q_ID` (`Q_ID`),
  ADD UNIQUE KEY `Question` (`Question`),
  ADD KEY `Course_ID` (`Course_ID`),
  ADD KEY `Course_ID_2` (`Course_ID`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`SSN`),
  ADD UNIQUE KEY `SSN` (`SSN`),
  ADD KEY `Dept_ID` (`Dept_ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`SSN`),
  ADD UNIQUE KEY `SSN` (`SSN`),
  ADD KEY `Dept_ID` (`Dept_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `Course_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `q_bank`
--
ALTER TABLE `q_bank`
  MODIFY `Q_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `C_DEPT_ID` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `STAFF_DEPT_ID` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `Sdept_ID` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
