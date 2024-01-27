-- name: Createtransaction :one
INSERT INTO transfers(
      to_first_Name,
     to_last_Name,
     from_sort_code ,     
      from_account,      
      to_sort_code ,     
      to_account,
      amount       
) VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *;



-- name: Gettransaction :one
SELECT * FROM transfers
WHERE id = $1 LIMIT 1;






-- name: Listtransaction :many
SELECT * FROM transfers
WHERE from_account = $1 OR to_account = $2
ORDER BY account_number
LIMIT $3
OFFSET $4;



