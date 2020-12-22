CREATE TABLE IF NOT EXISTS roles(
  id serial PRIMARY KEY,
  name VARCHAR (255) UNIQUE NOT NULL
);

INSERT INTO roles VALUES (1, 'admin');
INSERT INTO roles VALUES (2, 'user');
