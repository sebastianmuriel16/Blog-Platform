
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    read_time INTEGER NOT NULL,
    category_id UUID NOT NULL,
    author_id UUID NOT NULL,
    status VARCHAR(25) NOT NULL CHECK (status IN ('DRAFT', 'PUBLISHED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,

    CONSTRAINT fk_posts_author
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,

    CONSTRAINT fk_posts_category
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
 );

 CREATE INDEX idx_posts_author_id ON posts(author_id);
 CREATE INDEX idx_posts_category_id ON posts(category_id);
 CREATE INDEX idx_posts_status ON posts(status);
 CREATE INDEX idx_posts_read_time ON posts(read_time);

