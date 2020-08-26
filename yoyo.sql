/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.14-MariaDB : Database - yoyo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8_general_ci NOT NULL,
  `queue` text COLLATE utf8_general_ci NOT NULL,
  `payload` longtext COLLATE utf8_general_ci NOT NULL,
  `exception` longtext COLLATE utf8_general_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `games` */

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `games` */

insert  into `games`(`id`,`name`,`created_at`,`updated_at`) values 
(1,'game1','2020-08-22 19:24:37','2020-08-22 19:24:37'),
(4,'game4','2020-08-22 21:18:27','2020-08-22 21:18:27'),
(5,'game5','2020-08-22 21:18:32','2020-08-22 21:18:32'),
(6,'game6','2020-08-22 21:18:37','2020-08-22 21:18:37'),
(9,'game9','2020-08-22 21:18:49','2020-08-22 21:18:49'),
(10,'game10','2020-08-23 08:03:55','2020-08-23 08:03:55'),
(11,'game11','2020-08-24 19:33:15','2020-08-24 19:33:15');

/*Table structure for table `judge_players` */

DROP TABLE IF EXISTS `judge_players`;

CREATE TABLE `judge_players` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `judge_id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `vote_plus` int(11) NOT NULL,
  `vote_minus` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `judge_players` */

insert  into `judge_players`(`id`,`judge_id`,`game_id`,`player_id`,`vote_plus`,`vote_minus`,`created_at`,`updated_at`) values 
(1,1,11,23,25,5,NULL,NULL),
(2,2,11,23,23,5,NULL,NULL),
(3,3,11,23,20,4,NULL,NULL),
(4,2,11,25,20,4,NULL,NULL),
(5,5,11,25,24,5,NULL,NULL);

/*Table structure for table `judges` */

DROP TABLE IF EXISTS `judges`;

CREATE TABLE `judges` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `judges` */

insert  into `judges`(`id`,`name`,`created_at`,`updated_at`) values 
(1,'judge1','2020-08-22 19:39:18','2020-08-22 19:39:18'),
(2,'judge2','2020-08-22 19:39:27','2020-08-22 19:39:27'),
(3,'judge3','2020-08-22 19:39:31','2020-08-22 19:39:31'),
(4,'judge4','2020-08-23 07:58:52','2020-08-23 07:58:52'),
(5,'judge5','2020-08-23 08:04:03','2020-08-23 08:04:03'),
(6,'judge6','2020-08-24 19:33:45','2020-08-24 19:33:45');

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_resets_table',1),
(3,'2019_08_19_000000_create_failed_jobs_table',1),
(4,'2020_08_21_221808_create_games_table',2),
(5,'2020_08_21_221826_create_players_table',2),
(6,'2020_08_21_222703_create_judges_table',2),
(7,'2020_08_22_194438_create_judge__players_table',3);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `password_resets` */

/*Table structure for table `players` */

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `players` */

insert  into `players`(`id`,`name`,`created_at`,`updated_at`) values 
(6,'6','2020-08-22 15:27:10','2020-08-22 15:27:10'),
(7,'7','2020-08-22 15:27:47','2020-08-22 15:27:47'),
(13,'13','2020-08-22 19:14:34','2020-08-22 19:14:34'),
(17,'17','2020-08-22 21:14:36','2020-08-22 21:14:36'),
(18,'18','2020-08-22 21:14:42','2020-08-22 21:14:42'),
(19,'19','2020-08-22 22:13:59','2020-08-22 22:13:59'),
(20,'20','2020-08-22 22:14:06','2020-08-22 22:14:06'),
(23,'23','2020-08-23 08:07:21','2020-08-23 08:07:21'),
(24,'24','2020-08-23 08:07:32','2020-08-23 08:07:32'),
(25,'25','2020-08-23 08:09:03','2020-08-23 08:09:03'),
(26,'26','2020-08-23 08:09:50','2020-08-23 08:09:50'),
(27,'27','2020-08-23 08:09:56','2020-08-23 08:09:56'),
(28,'28','2020-08-23 08:10:29','2020-08-23 08:10:29'),
(29,'29','2020-08-23 08:16:38','2020-08-23 08:16:38'),
(30,'30','2020-08-23 08:39:10','2020-08-23 08:39:10'),
(31,'31','2020-08-23 08:39:16','2020-08-23 08:39:16'),
(32,'32','2020-08-23 08:58:32','2020-08-23 08:58:32'),
(33,'33','2020-08-23 08:58:38','2020-08-23 08:58:38'),
(34,'34','2020-08-24 19:33:52','2020-08-24 19:33:52'),
(35,'35','2020-08-24 19:33:59','2020-08-24 19:33:59'),
(36,'36','2020-08-24 19:36:38','2020-08-24 19:36:38');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
