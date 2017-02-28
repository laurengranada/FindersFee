

create database findersfee_db;
use findersfee_db;

create table findersfee (
id int not null auto_increment primary key,
username varchar(50) not null,
seeker boolean default false,
email varchar(50) not null,
item_name varchar(50) not null,
category varchar(50) not null,
description varchar(500) not null,
fee decimal (10),
found boolean default false,
finders_email varchar(50)
);