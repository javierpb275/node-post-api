
CREATE TABLE `post_db`.`users` (
    `user_id` INT NOT NULL AUTO_INCREMENT , 
    `username` VARCHAR(25) NOT NULL , 
    `email` VARCHAR(50) NOT NULL , 
    `password` BINARY(60) NOT NULL , 
    `avatar` TEXT NULL , 
    PRIMARY KEY (`user_id`), 
    UNIQUE (`username`), 
    UNIQUE (`email`)
) ENGINE = InnoDB;

CREATE TABLE `post_db`.`posts` (
    `post_id` INT NOT NULL AUTO_INCREMENT , 
    `title` VARCHAR(50) NOT NULL , 
    `description` TEXT NULL , 
    `post_image` TEXT NULL , 
    `user_id` INT NOT NULL , 
    PRIMARY KEY (`post_id`),
    INDEX user_index (`user_id`),
    FOREIGN KEY (`user_id`)
    REFERENCES users(`user_id`)
    ON DELETE CASCADE
) ENGINE = InnoDB;

