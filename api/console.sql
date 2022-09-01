create database if not exists stuff;

use stuff;

create table categories
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table locations
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table things
(
    id          int auto_increment
        primary key,
    location_id int          not null,
    category_id int          not null,
    title       varchar(255) not null,
    description text         null,
    photo       text         null,
    datetime    varchar(10)  null,
    constraint things_categories_null_fk
        foreign key (category_id) references categories (id)
            on update cascade,
    constraint things_locations_null_fk
        foreign key (location_id) references locations (id)
            on update cascade
);

INSERT into categories(title, description)
values ('Furniture', 'Furniture for smth');

INSERT into locations(title, description)
values ('Office', 'location office');

INSERT into things(category_id, location_id, title, description, photo, datetime)
values (1, 1, 'MAC', 'NoteBook', null, '2022-02-02');