CREATE DATABASE users_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE,
    is_active INT
);

INSERT INTO users (first_name, last_name, date_of_birth, is_active)
VALUES
    ('Alex', 'Alexandrov', '1990-02-10', '1'),
    ('Jinny', 'Jones', '2000-07-19', '1'),
    ('Kate', 'Petrova', '1987-06-08', '1'),
    ('Wade', 'Armstrong', '1965-02-27', '0'),
    ('Lily', 'Collins', '1989-03-18', '1')
;
