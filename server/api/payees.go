package api

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (server *Server) getPayees(ctx *gin.Context){


	payee, err:=server.db.GetPayee(ctx, GetAuth(*server, ctx))
	if err !=nil{
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
		
	}


	ctx.JSON(http.StatusOK, payee)
}



type payeeRequest struct{
	AccountNumber int32  `json:"payee_id"`
}

func (server *Server) getPaybyId(ctx *gin.Context){

	var req payeeRequest


	if err:=ctx.ShouldBindJSON(&req); err !=nil{
		ctx.JSON(http.StatusBadRequest, errorRespons(err))
		return 
	}

	payee, err:= server.db.GetPayeeAccount(ctx, req.AccountNumber )
	if err!=nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}


	ctx.JSON(http.StatusOK, payee)
}



func (server *Server) getPayeeFavourite(ctx *gin.Context){

	favouritePayee, err := server.db.GetPayeeFavourite(ctx, GetAuth(*server, ctx))
	if err !=nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}


	ctx.JSON(http.StatusOK, favouritePayee)
}