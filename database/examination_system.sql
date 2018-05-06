-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2018 at 11:28 PM
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
(5, 'Steel', 2, '2nd grade', 50, 100),
(6, 'Machinery', 2, '2nd grade', 50, 100),
(7, 'arch design', 3, '2nd grade', 50, 100),
(8, 'arch design 2', 3, '2nd grade', 50, 100),
(9, 'arch design3', 3, '2nd grade', 50, 100);

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
  `Course_ID` int(11) NOT NULL,
  `Staff_SSN` varchar(14) CHARACTER SET utf8 NOT NULL,
  `Dept_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `q_bank`
--

INSERT INTO `q_bank` (`Q_ID`, `Q_type`, `Question`, `correct answer`, `Q_Ans1`, `Q_Ans2`, `Q_Ans3`, `Q_Ans4`, `Course_ID`, `Staff_SSN`, `Dept_ID`) VALUES
(1, 'mcq', 'magnetic field is ....... field', 'electric', 'electric', 'force', 'both', 'none', 2, '96384179165815', 1),
(2, 'TOF', 'Is short circuit bad', 'true', 'true', NULL, NULL, NULL, 1, '95874586321869', 1),
(3, 'complete', 'The sum of voltages in close loop equals ......', 'zero', 'zero', NULL, NULL, NULL, 1, '96384179165815', 1);

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
('14523698547512', 'hosam ahmed', 3, 'hosamahmed@gmail.com', '89412584532', '2nd grade'),
('59865742315826', 'ahemd hosam', 1, 'ahemdhosam@gmail.com', '87492161', '2nd grade'),
('98547621584236', 'mohamed ahemd', 2, 'mohamedahemd@gmail.com', '84651120', '2nd grade');

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
  ADD KEY `Staff_SSN` (`Staff_SSN`),
  ADD KEY `Course_ID_2` (`Course_ID`),
  ADD KEY `Dept_ID` (`Dept_ID`);

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
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `C_DEPT_ID` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `q_bank`
--
ALTER TABLE `q_bank`
  ADD CONSTRAINT `Course_ID_QBANK` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `QBANK_DEPT_ID` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `STAFF_SSN_QBANK` FOREIGN KEY (`Staff_SSN`) REFERENCES `staff` (`SSN`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
