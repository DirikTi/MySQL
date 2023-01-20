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

CREATE VIEW v_posts
AS
SELECT p.postId, 
FROM posts p