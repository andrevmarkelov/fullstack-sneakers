CREATE DATABASE sneakers;

CREATE TABLE items(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image VARCHAR(255),
  price INTEGER
);

CREATE TABLE cart(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image VARCHAR(255),
  price INTEGER
);

CREATE TABLE favorites(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image VARCHAR(255),
  price INTEGER
);

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image VARCHAR(255),
  price INTEGER,
  transaction_id INTEGER
);