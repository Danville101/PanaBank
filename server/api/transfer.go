package api

import (
	db "backend/db/sqlc"

	"net/http"

	"github.com/gin-gonic/gin"
)








type transferRequest struct {
	
	FromSortCode string `json:"from_sort_code"`
	FromAccount  int32  `json:"from_account"`
	ToFirstName   string `json:"to_first_name"`
	ToLastName    string `json:"to_last_name"`
	ToSortCode   string `json:"to_sort_code"`
	ToAccount    int32  `json:"to_account"`
	Amount       int64  `json:"amount"`
}



func (server *Server) createTransfer(ctx *gin.Context){
	var req transferRequest
	if err:=ctx.ShouldBindJSON(&req); err !=nil{
		ctx.JSON(http.StatusBadRequest, errorRespons(err))
		return 
	}

	user, err:=server.db.GetUser(ctx ,GetAuth(*server,ctx))
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}



	if req.Amount < 0{
		ctx.String(http.StatusBadRequest, "Please enter amount greater that 0")
		return
	}

	arg := db.TransfertxParams{
		FromAccount: req.FromAccount,
		FromSortCode: req.FromSortCode,
		ToAccount: req.ToAccount,
		ToSortCode: req.ToSortCode,
		Amount: req.Amount,
		Email: GetAuth(*server, ctx),
		ToFirstName: req.ToFirstName,
		ToLastName: req.ToLastName,
		FromFirstName: user.FirstName,
		FromLastName: user.LastName,
	}

	result, err := server.db.TransferTx(ctx ,arg)
	if err != nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}

	ctx.JSON(http.StatusOK, result)

}