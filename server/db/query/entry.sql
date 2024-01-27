-- name: CreateEntry :one
INSERT INTO entries(
     amount,
     account_number,
     entry_first_name,
     entry_last_name
)VALUES( $1, $2,$3,$4)
RETURNING *;


-- name: GetEntry :one
SELECT * FROM entries
WHERE account_number =$1 LIMIT 1;


-- name: ListEntries :many
SELECT * FROM entries
WHERE account_number = $1
ORDER BY id;


--LIMIT $2
--OFFSET $3;

