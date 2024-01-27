-- name: CreatUser :one
INSERT INTO users(
     first_name,
     last_name,
     password,
     email
)VALUES(
     $1, $2, $3, $4
) RETURNING *;


-- name: GetUser :one
SELECT * FROM users
WHERE  email = $1;





-- name: DeteUser :exec
DELETE FROM users
WHERE first_name = $1 AND last_name =$2;







