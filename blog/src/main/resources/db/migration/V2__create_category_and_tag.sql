
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_tags_name ON tags(name);