// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0
// source: user.sql

package db

import (
	"context"
)

const creatUser = `-- name: CreatUser :one
INSERT INTO users(
     first_name,
     last_name,
     password,
     email
)VALUES(
     $1, $2, $3, $4
) RETURNING id, first_name, last_name, password, email
`

type CreatUserParams struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Password  string `json:"password"`
	Email     string `json:"email"`
}

func (q *Queries) CreatUser(ctx context.Context, arg CreatUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, creatUser,
		arg.FirstName,
		arg.LastName,
		arg.Password,
		arg.Email,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Password,
		&i.Email,
	)
	return i, err
}

const deteUser = `-- name: DeteUser :exec
DELETE FROM users
WHERE first_name = $1 AND last_name =$2
`

type DeteUserParams struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func (q *Queries) DeteUser(ctx context.Context, arg DeteUserParams) error {
	_, err := q.db.ExecContext(ctx, deteUser, arg.FirstName, arg.LastName)
	return err
}

const getUser = `-- name: GetUser :one
SELECT id, first_name, last_name, password, email FROM users
WHERE  email = $1
`

func (q *Queries) GetUser(ctx context.Context, email string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.FirstName,
		&i.LastName,
		&i.Password,
		&i.Email,
	)
	return i, err
}
