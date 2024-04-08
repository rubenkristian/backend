CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    points DECIMAL NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    writer varchar(100) NOT NULL,
    cover_image varchar(255) NOT NULL,
    points DECIMAL NOT NULL
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL
);

CREATE TABLE book_tags (
    book_id INT REFERENCES books(id),
    tag_id INT REFERENCES tags(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    book_id INT REFERENCES books(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancelled BOOLEAN DEFAULT FALSE,
    cancelled_at TIMESTAMP
);