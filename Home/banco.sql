drop database users;

/*Começa aqui!*/
create database Users;
use Users;
create table UsersReg(
 idUser int(4) not null primary key auto_increment,
 name char(40) not null,
 email char(40) not null,
 pwd char(80) not null) Engine = InnoDB;

 insert into usersreg (name, email, pwd) values ("João","joão.rosse@gmail.com","12345678");

 select * from usersreg;

