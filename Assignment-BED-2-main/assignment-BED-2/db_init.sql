CREATE SCHEMA CA2;
USE CA2;

CREATE TABLE users (
userid              int             not null    AUTO_INCREMENT,
username            varchar(100)    not null,
email               varchar(100)    not null,
password            varchar(100)    not null,
type                varchar(100)     not null,
profile_pic_url     varchar(200)    not null,
created_at          TIMESTAMP       not null    DEFAULT NOW(),
Primary key (userid),
UNIQUE (email));

create table game(
gameid			int				not null	auto_increment,
title			varchar(50) 	not null,
description		varchar(300)	not null,
year			int(4)			not null,
created_at		timestamp		not null 	Default NOW(),
primary key (gameid));

create table gameprices (
priceid         int             not null,
gameid          int             not null,
platformid      int             not null,
price           float           not null,
primary key (priceid),
foreign key (gameid) REFERENCES game(gameid) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (platformid) REFERENCES platform(platformid) ON UPDATE CASCADE ON DELETE CASCADE
);

create table gamecategory (
gamecategoryid  int             not null    auto_increment,
gameid          int             not null,
catid           int             not null,
primary key (gamecategoryid),
foreign key (catid) REFERENCES category(catid) ON UPDATE CASCADE ON DELETE CASCADE,
foreign key (gameid) REFERENCES game(gameid) ON UPDATE CASCADE ON DELETE CASCADE
);

create table category (
catid           int             not null    auto_increment,
catname         varchar(100)    not null,
description     varchar(200)    not null,
primary key (catid),
)

create table review (
reviewid       int              not null    auto_increment,
gameid         int              not null,
userid         int              not null,
content        varchar(200)     not null,
created_at     timestamp        not null    DEFAULT NOW(),
primary key (reviewid),
foreign key (gameid) REFERENCES game(gameid) ON DELETE CASCADE ON UPDATE CASCADE,
foreign key (userid) REFERENCES users(userid) ON DELETE CASCADE ON UPDATE CASCADE
)