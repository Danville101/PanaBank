// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0
// source: entry.sql

package db

import (
	"context"
)

const createEntry = `-- name: CreateEntry :one
INSERT INTO entries(
     amount,
     account_number,
     entry_first_name,
     entry_last_name
)VALUES( $1, $2,$3,$4)
RETURNING id, amount, entry_first_name, entry_last_name, account_number, created_at
`

type CreateEntryParams struct {
	Amount         int64  `json:"amount"`
	AccountNumber  int32  `json:"account_number"`
	EntryFirstName string `json:"entry_first_name"`
	EntryLastName  string `json:"entry_last_name"`
}

func (q *Queries) CreateEntry(ctx context.Context, arg CreateEntryParams) (Entry, error) {
	row := q.db.QueryRowContext(ctx, createEntry,
		arg.Amount,
		arg.AccountNumber,
		arg.EntryFirstName,
		arg.EntryLastName,
	)
	var i Entry
	err := row.Scan(
		&i.ID,
		&i.Amount,
		&i.EntryFirstName,
		&i.EntryLastName,
		&i.AccountNumber,
		&i.CreatedAt,
	)
	return i, err
}

const getEntry = `-- name: GetEntry :one
SELECT id, amount, entry_first_name, entry_last_name, account_number, created_at FROM entries
WHERE account_number =$1 LIMIT 1
`

func (q *Queries) GetEntry(ctx context.Context, accountNumber int32) (Entry, error) {
	row := q.db.QueryRowContext(ctx, getEntry, accountNumber)
	var i Entry
	err := row.Scan(
		&i.ID,
		&i.Amount,
		&i.EntryFirstName,
		&i.EntryLastName,
		&i.AccountNumber,
		&i.CreatedAt,
	)
	return i, err
}

const listEntries = `-- name: ListEntries :many
SELECT id, amount, entry_first_name, entry_last_name, account_number, created_at FROM entries
WHERE account_number = $1
ORDER BY id
`

func (q *Queries) ListEntries(ctx context.Context, accountNumber int32) ([]Entry, error) {
	rows, err := q.db.QueryContext(ctx, listEntries, accountNumber)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Entry{}
	for rows.Next() {
		var i Entry
		if err := rows.Scan(
			&i.ID,
			&i.Amount,
			&i.EntryFirstName,
			&i.EntryLastName,
			&i.AccountNumber,
			&i.CreatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
