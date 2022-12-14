CREATE DATABASE todoList;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,           /*  SERIAL is a function that increase the PK's uniqueness */
    description VARCHAR(255)
);