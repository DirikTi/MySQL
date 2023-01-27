CREATE VIEW v_users
AS
SELECT u.userId, u.username, u.email, u.phone, u.name, u.avatar, u.avatarUrl, u.isSpecialUser, u.phoneToken,
u.lastLogin_date, u.updated_date, u.created_date, (
    SELECT COUNT()
    FROM releationships r
    WHERE r.userOneId=u.userId OR r.userTwoId=u.userId
) AS friends_count,
COALESCE((
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', n.notificationId,
            'title', n.title,
            'body', n.body,
            'created_date', n.created_date
        )
    ) FROM notifications n
    WHERE n.userId=u.userId AND isShowed=0
), '[]') AS notifications
FROM users u;

CREATE VIEW v_comments
AS
SELECT u.userId, u.username, u.avatar, pc.postCommentId,
(
    SELECT JSON_OBJECT(
        'userId', u.userId,
        'username', u.username,
        'avatar', u.avatar
    )
    FROM users u 
    WHERE u.userId 
    LIMIT 1 pc.userId
) AS
FROM post_comments pc

CREATE VIEW v_posts
AS
SELECT p.postId, postUrls, typeText, type,(
    SELECT COUNT(1) 
    FROM post_likes pl
    WHERE pl.postId=p.postId
) AS likeCount, COALESCE((
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', pc.postCommentId,
            ''
        )
    )
)) comments
FROM posts p