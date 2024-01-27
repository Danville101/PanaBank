package db

import (
	"context"
	"database/sql"
	"fmt"


)




type SQLStore struct{
	db *sql.DB
	*Queries
}



func NewStore(db *sql.DB) *SQLStore{
	return &SQLStore{
		db:db,
		Queries: New(db),
	}
}


func (store *SQLStore) execTx(ctx context.Context, steps func(*Queries) error) error{
	trans, err := store.db.BeginTx(ctx, nil)
	if err !=nil{
		return err
	}

	quires:= New(trans)
	err = steps(quires)
	if err != nil{
		if rollerr:=trans.Rollback(); rollerr!=nil{
			return fmt.Errorf("transaction err: %v, rollBack err: %v",err, rollerr)
		}
		return err
	}
	
	return trans.Commit()

}



type TransfertxParams struct {
	FromSortCode string `json:"from_sort_code"`
	FromAccount  int32  `json:"from_account"`
	ToSortCode   string `json:"to_sort_code"`
	ToAccount    int32  `json:"to_account"`
	Amount       int64  `json:"amount"`
	ToFirstName  string	 `json:"to_first_name"`
	ToLastName     string   `json:"to_last_name"`
	Email          string     `json:"owner"`
	FromFirstName      string     `json:"from_first_name"`
	FromLastName       string      `json:"from_last_name"`
	
}


type TransferTxResult struct {
	Transfer  Transfer `json:"transfer`
	FromAccount   Account `json:"from_account"`
	ToAccount        Account`json:"to_account"`
	FromEntry    Entry `json:"from_entry"`
	ToEntry    Entry `json:"to_entry"`
	Payee    Payee `json:"payee"`
	
}


func (store *SQLStore) TransferTx(ctx context.Context, arg TransfertxParams)(TransferTxResult, error){
	var result TransferTxResult

      /// GET USER

	


		err:= store.execTx(ctx, func(queries *Queries)error{
			var err error
			result.Transfer, err = queries.Createtransaction(ctx, CreatetransactionParams{
				FromAccount: arg.FromAccount,
				FromSortCode: arg.FromSortCode,
				ToFirstName: arg.ToFirstName,
				ToLastName: arg.ToLastName,
				ToAccount: arg.ToAccount,
				ToSortCode: arg.ToSortCode,
				Amount: arg.Amount ,
			})
			if err != nil{
				return err
			}

		

			result.FromEntry, err=  queries.CreateEntry(ctx, CreateEntryParams{
                    EntryFirstName: arg.ToFirstName,
				EntryLastName: arg.ToLastName,
				AccountNumber: arg.FromAccount,
				Amount: -arg.Amount,
			})
			if err !=nil{
				return err
			}

			result.ToEntry, err= queries.CreateEntry(ctx, CreateEntryParams{
				EntryFirstName: arg.FromFirstName,
				EntryLastName: arg.FromLastName,
				AccountNumber: arg.ToAccount,
				Amount: arg.Amount,
			})
			if err !=nil{
				return err
			}

			result.Payee, err=queries.CreatePayee(ctx, CreatePayeeParams{
				OwnerEmail: arg.Email ,
				PayeeFirstName: arg.ToFirstName,
				PayeeLastName: arg.ToLastName,
				AccountNumber: arg.ToAccount,
				SortCode: arg.ToSortCode,
			})
			if err !=nil{
				return err
			}

			//fromUser, err:= queries.GetUser(ctx,Create )

		

			result.FromAccount, err = queries.AddAccountBalance(ctx,AddAccountBalanceParams{
				AccountNumber: arg.FromAccount,
				Amount: -arg.Amount,
			})
			if err !=nil{
				return err
			}
			 

			result.ToAccount, err = queries.AddAccountBalance(ctx,AddAccountBalanceParams{
				AccountNumber: arg.ToAccount,
				Amount: arg.Amount ,
			})
			if err !=nil{
				return err
			}
			/// Update account


			return err
		})

		return result, err
}