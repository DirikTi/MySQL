CREATE TEMPORARY TABLE temp_type_datas (name VARCHAR(150), relation VARCHAR(150));

INSERT INTO temp_type_datas (name, relation) VALUES
('main', 0),
('books', 'main'),
('games', 'main'),
('films', 'main'),
('sports', 'main'),

('fantastics', 'books'),
('classic', 'books'),
('romans', 'books'),

('rpg', 'games'),
('fps', 'games'),
('spy', 'games'),

('scary', 'films'),
('adventure', 'films'),
('commedy', 'films'),

('football', 'sports'),
('basketball', 'sports'),
('tennis', 'sports');
