package api

import (
	util "backend/utils"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)





func authMiddleware(ctx *gin.Context){
	jwt, err:= ctx.Request.Cookie("token")
	if err !=nil{
		ctx.String(http.StatusUnauthorized, "Unauthorized please login")
		ctx.Abort()
		return 
	}

	payload, err:= util.Verify(jwt.Value)
	if err != nil{
		ctx.String(http.StatusUnauthorized, "Unauthorized please login")
		ctx.Abort()
		return 
	}


	fmt.Println(payload)
	ctx.Next()


}