-- name: CreatePayee :one
INSERT INTO payees(
     payee_last_name,
     payee_first_name,
     owner_email,
    account_number,
  sort_code 
)VALUES($1,$2,$3,$4,$5)
RETURNING *;



-- name: GetPayee :many
SELECT  DISTINCT    payee_last_name, payee_first_name,account_number,sort_code   FROM payees
WHERE owner_email =$1;



-- name: GetPayeeAccount :one
SELECT  DISTINCT  ID, payee_last_name, payee_first_name,account_number,sort_code   FROM payees
WHERE account_number =$1;



-- name: GetPayeeFavourite :many
SELECT payee_last_name, payee_first_name,account_number,sort_code  FROM payees
WHERE owner_email =$1
GROUP BY payee_last_name, payee_first_name,account_number,sort_code
HAVING COUNT(account_number) >= 5;




