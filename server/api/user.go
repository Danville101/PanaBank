package api

import (
	db "backend/db/sqlc"
	util "backend/utils"
	"database/sql"
	//"fmt"
	//"log"
	"net/http"

	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"math/rand"
	"time"
)




type createUserRequest struct {
	FirstName string `json:"first_name" binding:"required"`
	LastName  string `json:"last_name" binding:"required"`
	Password  string `json:"password" binding:"required"`
	Password2  string `json:"password2" binding:"required"`
	Email     string `json:"email"  binding:"required,email"`
	CardNumber    int32  `json:"card_number"`
	AccountNumber int32  `json:"account_number" `
	SortCode      string `json:"sort_code" `
	IssuedDate    string `json:"issued_date" `
	ExpireDate    string `json:"expire_date" `
	Balance       int32  `json:"balance" `
}

func (server *Server) createUser(ctx *gin.Context){
	var req createUserRequest

	if err:= ctx.ShouldBind(&req); err!=nil{
		ctx.JSON(http.StatusBadRequest, errorRespons(err))
		return
	}


	if req.Password != req.Password2{
		ctx.String(404,"Passwords dont match")
		return 
	}


	hashedPassword, err:= util.HashPassword(req.Password)
	if err !=nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
	}

	


	cardNum:= func() int{
		min := 6000000000000000
		max := 6999999999999999
		// set seed
		rand.Seed(time.Now().UnixNano())
		// generate random number and print on console
		return rand.Intn(max - min) + min
	}


	accountNumber:=func() int{
		min:= 20000000
		max:= 99999999

		// set seed
		rand.Seed(time.Now().UnixNano())
		// generate random number and print on console
		return rand.Intn(max - min) + min
	}



	sortCode:= func() string{
		min1:=80
		max1:=89

		rand.Seed(time.Now().UnixNano())
		// generate random number and print on console
	     first:=rand.Intn(max1 - min1) + min1
		firstString:=strconv.Itoa(first)

		min2:=10
		max2:=99

		rand.Seed(time.Now().UnixNano())
		// generate random number and print on console
	     second:=rand.Intn(max2 - min2) + min2
		secondString:=strconv.Itoa(second)

	     third:=rand.Intn(max2 - min2) + min2
		thirdString:=strconv.Itoa(third)


		return firstString+"-"+secondString+"-"+thirdString

	}




	iusseDate:=func()string{
		issuedDate:= strings.ToUpper(time.Now().Month().String()[:3])+"/" + strconv.Itoa(time.Now().Year())
		
		return issuedDate
	}



	expireDate:=func()string{
		expiredDate:= strings.ToUpper(time.Now().Month().String()[:3])+"/" + strconv.Itoa(time.Now().Year()+4)

		return expiredDate
	
	}




	// Database arguments being set
	args:= db.CreatUserParams{
		FirstName: req.FirstName,
		LastName: req.LastName,
		Password: hashedPassword,
		Email: req.Email,
		
	}

	args2:=db.CreateAccountParams{
		Owner: req.Email,
		CardNumber: int64(cardNum()),
		AccountNumber: int32(accountNumber()),
		SortCode: sortCode(),
		IssuedDate: iusseDate(),
		ExpireDate: expireDate(),
		Balance: 10000,
	}

	user, err:=server.db.CreatUser(ctx, args)
	if err!=nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return 
	}

	account, err:=server.db.CreateAccount(ctx, args2)
	if err !=nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return 
	}

	ctx.JSON(http.StatusOK, user)
	ctx.String(200, "Account was created for:%v",account.Owner)

}




type loginRequest struct {
	Password  string `json:"password" `
	Email     string `json:"email"  `
}


func (server *Server) login(ctx *gin.Context){

	var req loginRequest

	if err:=ctx.ShouldBind(&req); err!=nil{
		ctx.JSON(http.StatusBadRequest, errorRespons(err))
		return
	}

	user, err:= server.db.GetUser(ctx, req.Email)
	if err != nil{
		if err == sql.ErrNoRows{
			ctx.JSON(http.StatusNotFound , errorRespons(err))
		}
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}

	err = util.CheckPassword(req.Password, user.Password)
	if err !=nil{
		ctx.JSON(http.StatusUnauthorized, errorRespons(err))
	}

	
	

	accessToken, err:= util.SignJWT(&util.Payload{user.Email })
	if err !=nil{
		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name: "token",
		Value: accessToken,
		HttpOnly: true,
		Path: "/",
		Secure: false,
		Domain: "localhost",
		
	})




	
}



func (server *Server) getUser(ctx *gin.Context){

	user, err:= server.db.GetUser(ctx, GetAuth(*server, ctx))
	if err !=nil{
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorRespons(err))
			return
		}

		ctx.JSON(http.StatusInternalServerError, errorRespons(err))
		return
	}


	ctx.JSON(http.StatusOK, user)

}





func (server *Server) logout(ctx *gin.Context){
	http.SetCookie(ctx.Writer, &http.Cookie{
		Name: "token",
		Value: "",
		HttpOnly: true,
		Path: "/",
		Secure: false,
		Domain: "localhost",
		
	})


}

//func gettoke(server *Server, ctx *gin.Context){
//	jwt, err:= ctx.Request.Cookie("token")
//	if err !=nil{
//		return
//	}
//
//	payload, err:= util.Verify(jwt.Value)
//	if err != nil{
//		return
//	}
//
//	server.authPayload = *payload
//
//	fmt.Println(server.authPayload)
//}