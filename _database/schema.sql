CREATE DATABASE platform;

CREATE TABLE platform.users (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nickname VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  pass VARCHAR(50) NOT NULL
);

INSERT INTO platform.users (nickname, email, pass)
VALUES ("Oursin", "corbin@eu.epitech", "loveulol");
INSERT INTO platform.users (nickname, email, pass)
VALUES ("Zap", "zapata@piscine.cpp", "jesuislevraitt");
INSERT INTO platform.users (nickname, email, pass)
VALUES ("Geographer", "gege@geographer.fr", "gege_x_tete");
INSERT INTO platform.users (nickname, email, pass)
VALUES ("caillou", "caillou@shbebistan.es", "rockyou");
INSERT INTO platform.users (nickname, email, pass)
VALUES ("XeoSkr", "contact@burnhop.com", "n0h0m0");
INSERT INTO platform.users (nickname, email, pass)
VALUES ("Chef", "cereal@nail.mum", "fiatpunto");