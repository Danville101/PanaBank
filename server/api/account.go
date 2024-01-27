package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)




//type getAccountRequest struct{
//	Email string `binding:"email"`
//}

func (server *Server) getAccount(ctx *gin.Context){
	//var req getAccountRequest

	//if err := ctx.ShouldBindJSON(&req); err !=nil{
	//	ctx.JSON(http.StatusBadRequest, errorRespons(err))
	//	return
	//}

	account, err := server.db.GetAccountByEmail(ctx, GetAuth(*server, ctx))
	if err !=nil{
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}


	ctx.JSON(http.StatusOK, account)



}