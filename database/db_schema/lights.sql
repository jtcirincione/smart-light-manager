CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` TEXT NOT NULL,
  `salt` TEXT NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FK_PROFILE_PIC` FOREIGN KEY (`profile_pic`) REFERENCES `media` (`media_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;