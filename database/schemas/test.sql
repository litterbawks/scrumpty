-- ---
-- HOW TO USE 
-- PIPE THIS FILE INTO YOUR MYSQL DATABASE TO CLEAN THE DB AND TABLES
--
--

-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


 DROP DATABASE IF EXISTS testsprints;
 CREATE DATABASE testsprints;


-- ---
-- Table 'users'
-- 
-- ---

USE testsprints;


DROP TABLE IF EXISTS `blockers`;
		
CREATE TABLE `blockers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `task_id` INTEGER NOT NULL,
  `status_code` INTEGER DEFAULT 0,
  PRIMARY KEY (`id`)
);

ALTER TABLE blockers AUTO_INCREMENT = 1000;

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `sprint_id` INTEGER NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `user_id` INTEGER DEFAULT NULL,
  `status_code` INTEGER DEFAULT 0,
  `eta`TIMESTAMP NULL DEFAULT NULL,
  `priority_code` INTEGER DEFAULT 0,
  `difficulty` INTEGER DEFAULT 0,
  PRIMARY KEY (`id`)
);

ALTER TABLE tasks AUTO_INCREMENT = 1000;
		

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `username` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `owner_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE users AUTO_INCREMENT = 1000;

DROP TABLE IF EXISTS `sprints`;

CREATE TABLE `sprints` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE sprints AUTO_INCREMENT = 1000;

DROP TABLE IF EXISTS `sprinttasks`;

CREATE TABLE `sprinttasks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `task_id` INTEGER NOT NULL,
  `sprint_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE sprinttasks AUTO_INCREMENT = 1000;

DROP TABLE IF EXISTS `sprintusers`;

CREATE TABLE `sprintusers` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INTEGER NOT NULL,
  `sprint_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE sprintusers AUTO_INCREMENT = 1000;

-- ---
-- Table 'tasks'
-- 
-- ---



-- ---
-- Table 'blockers'
-- 
-- ---




-- ---
-- Foreign Keys 
-- ---

-- ALTER TABLE `tasks` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
-- ALTER TABLE `blockers` ADD FOREIGN KEY (task_id) REFERENCES `tasks` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `tasks` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `blockers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`password`) VALUES
-- ('','','');
-- INSERT INTO `tasks` (`id`,`title`,`description`,`user_id`,`status_code`,`eta`,`priority_code`,`difficulty`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `blockers` (`id`,`title`,`description`,`task_id`,`status_code`) VALUES
-- ('','','','','');