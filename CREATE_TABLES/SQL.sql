DROP DATABASE IF EXISTS fake_socialmedias;

CREATE DATABASE fake_socialmedias;

USE fake_socialmedias;

-- VARIABLE

CREATE TABLE IF NOT EXISTS users (
	userId INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username CHAR(127) NOT NULL,
    email CHAR(127) NOT NULL,
    phone CHAR(15) NOT NULL,
    name CHAR(63) NOT NULL,
    avatar CHAR(150) NOT NULL,
    avatarUrl TEXT GENERATED ALWAYS AS (CONCAT()) VIRTUAL
    isSpecialUser TINYINT(1) NOT NULl,
    loginToken BINARY(16),
    loginTokenText VARCHAR(36) GENERATED ALWAYS AS
		(INSERT(
			INSERT(
                INSERT(
                    INSERT(HEX(loginToken),9,0,'-'),
                    14,0,'-'),
                19,0,'-'),
			24,0,'-')
		) VIRTUAL,
    lastLogin_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP();
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    PRIMARY KEY (userId),
    UNIQUE (email, username)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS posts ( 
    postId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    typeId INT UNSIGNED NOT NULL AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    typeText TEXT(512),
    postUrls TEXT NOT NULL,
    type ENUM ('photo', 'video', 'text', 'mix')
    isDelete TINYINT(1) DEFAULT 0,
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
) ENGINE=InnoDB;
