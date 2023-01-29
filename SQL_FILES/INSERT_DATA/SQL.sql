use fake_socialmedias;

DROP TABLE IF EXISTS temp_type_datas;
CREATE TABLE temp_type_datas (id TINYINT(2), name VARCHAR(150), relation VARCHAR(150));

INSERT INTO temp_type_datas (id, name, relation) VALUES
(1, 'main', NULL),

(2, 'books', 'main'),
(3, 'games', 'main'),
(4, 'films', 'main'),
(5, 'sports', 'main'),

(6, 'fantastics', 'books'),
(7, 'classic', 'books'),
(8, 'romans', 'books'),

(9, 'rpg', 'games'),
(10, 'fps', 'games'),
(11, 'spy', 'games'),

(12, 'scary', 'films'),
(13, 'adventure', 'films'),
(14, 'commedy', 'films'),

(15, 'football', 'sports'),
(16, 'basketball', 'sports'),
(17, 'tennis', 'sports');


WITH RECURSIVE cte AS 
(
    SELECT id, name AS typeName, CAST(CONCAT('/', id) AS CHAR(20)) AS hieararcyid
    FROM temp_type_datas
    WHERE relation IS NULL
    UNION ALL
    SELECT ttd.id, ttd.name AS  typeName, CONCAT(c.hieararcyid, '/', (
        SELECT ROW_NUMBER() OVER (PARTITION BY ttd2.relation) AS row_num
        FROM temp_type_datas ttd2
        WHERE ttd2.id=c.id
        LIMIT 1
    )) AS hieararcyid
    FROM temp_type_datas ttd INNER JOIN cte c ON c.typeName=ttd.relation
    LIMIT 15
)
SELECT * FROM cte;