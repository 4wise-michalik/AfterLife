-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: afterlife
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `connected_platforms`
--

DROP TABLE IF EXISTS `connected_platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `connected_platforms` (
  `user_id` int(11) NOT NULL,
  `platform_id` int(11) NOT NULL,
  `verified` tinyint(4) DEFAULT 0,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `what_happens_to_account` int(11) DEFAULT 0,
  `what_happens_to_account_give_account_id` int(11) DEFAULT NULL,
  `what_happens_to_account_give_account_message` varchar(750) DEFAULT NULL,
  `what_happens_to_account_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`platform_id`),
  KEY `FK_platform_platforms` (`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connected_platforms`
--

LOCK TABLES `connected_platforms` WRITE;
/*!40000 ALTER TABLE `connected_platforms` DISABLE KEYS */;
INSERT INTO `connected_platforms` VALUES (3,9,0,'michal.soboszek@everyflow.pl','123456w',1,1,'','1900-01-01 00:00:00'),(3,10,0,'michal.soboszek@everyflow.pl','123456',0,4,'aaaa','2001-01-02 03:00:00'),(3,11,0,'michal.soboszek@everyflow.pl','123456',0,NULL,NULL,NULL),(4,10,0,'miroslaw.michalik@everyflow.pl','miroslaw.michalik@everyflow.pl',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `connected_platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memory_pages`
--

DROP TABLE IF EXISTS `memory_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memory_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `link` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memory_pages`
--

LOCK TABLES `memory_pages` WRITE;
/*!40000 ALTER TABLE `memory_pages` DISABLE KEYS */;
INSERT INTO `memory_pages` VALUES (1,3,'youtube.com');
/*!40000 ALTER TABLE `memory_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_id` int(11) DEFAULT NULL,
  `content` varchar(300) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message_receiver` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_posts_platforms` (`platform_id`),
  KEY `FK_posts_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (8,11,'twitter message 1','1900-01-01 00:00:00',3,'twitter receiver 1'),(9,11,'twitter message 2','1900-01-01 00:00:00',3,'twitter receiver 2'),(10,11,'twitter message 3','1900-01-01 00:00:00',3,'twitter receiver 3'),(11,10,'facebook message 1\n','1900-01-01 00:00:00',3,'facebook receiver 1'),(12,10,'facebook message 2','1900-01-01 00:00:00',3,'facebook receiver 2'),(13,10,'facebook message 3','1900-01-01 00:00:00',3,'facebook receiver 3'),(15,9,'instagram message 2','1900-01-01 00:00:00',3,'instagram receiver 2'),(16,9,'instagram message 3','1900-01-01 00:00:00',3,'instagram receiver 3'),(18,11,'twitter message 4','1900-01-01 00:00:00',3,'twitter receiver 4'),(19,10,'facebook message 4','1900-01-01 00:00:00',3,'facebook receiver 4');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (9,'Instagram'),(10,'Facebook'),(11,'Twitter'),(12,'Pinterest');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_id` int(11) DEFAULT NULL,
  `content` varchar(300) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_posts_platforms` (`platform_id`),
  KEY `FK_posts_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (141,11,'tp1','1900-01-01 00:00:00',3),(142,11,'tp2','1900-01-01 00:00:00',3),(143,11,'tp3','1900-01-01 00:00:00',3),(144,10,'facebook post 1','1900-01-01 00:00:00',3),(145,10,'facebook post 2','1900-01-01 00:00:00',3),(146,10,'facebook post 3','1900-01-01 00:00:00',3),(148,9,'instagram post 2','1900-01-01 00:00:00',3),(151,10,'facebook post 4','1900-01-01 00:00:00',3);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `user_id` int(11) NOT NULL,
  `token` varchar(500) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtaWNoYWwuc29ib3N6ZWtAZXZlcnlmbG93LnBsIiwiZmlyc3RfbmFtZSI6Ik1pY2hhxYIiLCJsYXN0X25hbWUiOiJTb2Jvc3playIsImRlY2Vhc2VkIjowLCJmcmllbmRfY29kZSI6IlQzbHlEQSIsInZlcmlmaWVkX2VtYWlsIjoxLCJ2ZXJpZmluZ19tZXRob2QiOjAsImlhdCI6MTczMzIyNjM2MCwiZXhwIjoxNzMzMjI5OTYwfQ.th747MEHMrO19v5TDQiIk4waF4qes4K-2r7H4i366PE'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInVzZXJuYW1lIjoibWlyb3NsYXcubWljaGFsaWtAZXZlcnlmbG93LnBsIiwiZmlyc3RfbmFtZSI6Ik1pcm9zxYJhdyIsImxhc3RfbmFtZSI6Ik1pY2hhbGlrIiwiZGVjZWFzZWQiOjAsImZyaWVuZF9jb2RlIjoidHRSSE55IiwidmVyaWZpZWRfZW1haWwiOjEsInZlcmlmaW5nX21ldGhvZCI6MCwiaWF0IjoxNzMzMjI2MjU0LCJleHAiOjE3MzMyMjk4NTR9.wzqE73Me1B7G1FN7HK8y2STAAg0KOgXgfOzkQhImQ7I');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trusted`
--

DROP TABLE IF EXISTS `trusted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trusted` (
  `user_id` int(11) NOT NULL,
  `trusted_id` int(11) NOT NULL,
  `bff` tinyint(1) DEFAULT 0,
  `reported` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`user_id`,`trusted_id`),
  KEY `FK_trusted_users_1` (`trusted_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trusted`
--

LOCK TABLES `trusted` WRITE;
/*!40000 ALTER TABLE `trusted` DISABLE KEYS */;
INSERT INTO `trusted` VALUES (1,3,0,1),(1,20,0,0),(2,1,0,0),(2,3,1,1),(2,4,0,1),(3,1,1,0),(3,2,1,0),(3,4,0,0),(3,8,0,0),(4,1,1,0),(20,3,0,0);
/*!40000 ALTER TABLE `trusted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `verified_email` tinyint(1) DEFAULT 0,
  `verifing_method` tinyint(4) DEFAULT 0,
  `deceased` tinyint(4) DEFAULT 0,
  `deceased_time` datetime DEFAULT NULL,
  `friend_code` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mariusz','Pudzianowski','marek.p@gmail.com','ToByNicNieDalo',0,0,0,NULL,'Puzian'),(2,'Jan','Nowak','janusz123@o2.pl','Zaq12wsx',1,1,0,NULL,'lRlK9H'),(3,'Michał','Soboszek','michal.soboszek@everyflow.pl','123456',1,0,0,NULL,'T3lyDA'),(20,'Mirosław','Michalik','miroslaw.michalik@everyflow.pl','123123',1,0,0,NULL,'ttRHNy');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification_codes`
--

DROP TABLE IF EXISTS `verification_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification_codes` (
  `user_id` int(11) NOT NULL,
  `code` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification_codes`
--

LOCK TABLES `verification_codes` WRITE;
/*!40000 ALTER TABLE `verification_codes` DISABLE KEYS */;
INSERT INTO `verification_codes` VALUES (3,788912),(4,861439),(6,375632),(17,386255),(18,483290),(20,248987);
/*!40000 ALTER TABLE `verification_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'afterlife'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04  8:21:11
