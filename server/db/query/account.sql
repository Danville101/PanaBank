-- name: CreateAccount :one
INSERT INTO account(
      owner,
     card_number,
      account_number,
      sort_code,
      issued_date,
      expire_date,
      balance
) VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *;



-- name: GetAccountForUpdate :one
SELECT * FROM account
WHERE account_number =$1 
FOR  UPDATE;


-- name: GetAccount :one
SELECT * FROM account
WHERE account_number =$1;



-- name: GetAccountByEmail :one
SELECT * FROM account
WHERE owner =$1;


-- name: AddAccountBalance :one
UPDATE  account
SET balance = balance + sqlc.arg(amount)
WHERE account_number = sqlc.arg(account_number)
 RETURNING *;


