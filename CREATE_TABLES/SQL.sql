DROP DATABASE IF EXISTS youtube;

CREATE DATABASE youtube;

USE youtube;

CREATE TABLE IF NOT EXISTS users (
	userId INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username CHAR(127) NOT NULL,
    email CHAR(127) NOT NULL UNIQUE,
    phone CHAR(15) NOT NULL,
    name CHAR(63) NOT NULL,
    userToken BINARY(16),
    userTokenText VARCHAR(36) GENERATED ALWAYS AS
		 (INSERT(
			INSERT(
			  INSERT(
				INSERT(HEX(userToken),9,0,'-'),
				14,0,'-'),
			  19,0,'-'),
			24,0,'-')
		 ) virtual,
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (userId)
) ENGINE=InnoDB;

