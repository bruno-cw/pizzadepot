-- -----------------------------------------------------
-- Schema chat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `chat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `chat` ;

-- -----------------------------------------------------
-- Table `chat`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(200) NULL,
  PRIMARY KEY (`iduser`))
  
-- -----------------------------------------------------
-- Table `chat`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chat`.`message` (
  `id_message` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(200) NULL,
  `id_user` INT NOT NULL,
  PRIMARY KEY (`id_message`),
  INDEX `fk_message_user_idx` (`id_user` ASC),
  CONSTRAINT `fk_message_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `chat`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)