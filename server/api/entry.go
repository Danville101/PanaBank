package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)






func (server *Server) getEntry(ctx *gin.Context){ 


	account, err := server.db.GetAccountByEmail(ctx, GetAuth(*server, ctx))
	if err !=nil{
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}

	account_number := account.AccountNumber


	entry, err := server.db.GetEntry(ctx, account_number)
	if err !=nil{
		if err == sql.ErrNoRows{
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}


	ctx.JSON(http.StatusOK, entry)

}
func (server *Server) listEntries(ctx *gin.Context){ 


	account, err := server.db.GetAccountByEmail(ctx, GetAuth(*server, ctx))
	if err !=nil{
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}

	account_number := account.AccountNumber


	entry, err := server.db.ListEntries(ctx, account_number)
	if err !=nil{
		if err == sql.ErrNoRows{
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}







	ctx.JSON(http.StatusOK, entry)

}