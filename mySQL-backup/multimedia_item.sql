-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: multimedia
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `iditem` int(11) NOT NULL AUTO_INCREMENT,
  `publisher_idpublisher` int(11) NOT NULL,
  `itemTitle` varchar(45) NOT NULL,
  `itemSubtitle` varchar(45) DEFAULT NULL,
  `context` varchar(80) DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `author` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iditem`,`publisher_idpublisher`),
  KEY `fk_item_publisher1_idx` (`publisher_idpublisher`),
  CONSTRAINT `fk_item_publisher1` FOREIGN KEY (`publisher_idpublisher`) REFERENCES `publisher` (`idpublisher`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,1,'多媒體資料庫','原文書',NULL,888,'李不會'),(2,1,'NoSQL資料庫實例挑戰','使用MongoDB為例','內容豐富有趣!!!!',562,'張大千'),(3,2,'ASP.NET專題實務I：C#入門實戰','VS2015版','最詳盡的ADO.NET範例，深度、廣度兼備，帶您直探.NET技術的資料存取核心',820,'MIS2000 Lab'),(4,2,'Deep Learning：用Python進行深度學習的基礎理論實作','從零開始，由實做中學習','本書的目標是，盡量避免使用不瞭解內容的「黑盒子」，以基礎的知識為起點，以容易上手的Python撰寫程式，從動手實作的過程中，一步步深入瞭解深度學習。',458,'吳芳'),(5,1,'Muitl','wwww','Context',23,'www');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-20 13:34:28
