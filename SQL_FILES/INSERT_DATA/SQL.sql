use fake_socialmedias;

DROP TABLE IF EXISTS temp_type_datas;
CREATE TABLE temp_type_datas (id TINYINT(2), name VARCHAR(150), relation VARCHAR(150));

DROP TEMPORARY TABLE IF EXISTS row_numb_datas;
CREATE TEMPORARY TABLE row_numb_datas (row_numb TINYINT(4), name CHAR(127), relation CHAR(127));

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


INSERT INTO row_numb_datas (row_numb, name, relation)
SELECT ROW_NUMBER() OVER (PARTITION BY relation) AS row_num, name, relation
FROM temp_type_datas;

WITH RECURSIVE cte AS 
(
    SELECT id, name AS typeName, CAST(CONCAT('/', id) AS CHAR(20)) AS hieararcyid
    FROM temp_type_datas
    WHERE relation IS NULL
    UNION ALL
    SELECT ttd.id, ttd.name AS  typeName, CONCAT(c.hieararcyid, '/', (
        SELECT row_numb
        FROM row_numb_datas ttd2
        WHERE ttd2.name=ttd.name
        LIMIT 1
    )) AS hieararcyid
    FROM temp_type_datas ttd INNER JOIN cte c ON c.typeName=ttd.relation
    LIMIT 15
)
SELECT * FROM cte;

DROP TEMPORARY TABLE IF EXISTS row_numb_datas;
DROP TABLE IF EXISTS temp_type_datas;