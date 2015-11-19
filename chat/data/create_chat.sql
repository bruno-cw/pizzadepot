-- -----------------------------------------------------
-- Schema chat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `chat` ;

-- -----------------------------------------------------
-- Table `chat`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat`.`user` (
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `chat`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat`.`message` (
  `id_message` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(200) NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_message`),
  INDEX `fk_message_user_idx` (`username` ASC),
  CONSTRAINT `fk_message_user`
    FOREIGN KEY (`username`)
    REFERENCES `chat`.`user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
