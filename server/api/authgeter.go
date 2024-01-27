package api

import (
	util "backend/utils"

	"github.com/gin-gonic/gin"
)





func GetAuth(server Server, ctx *gin.Context) string {
	jwt, err:= ctx.Request.Cookie("token")
	if err !=nil{
		ctx.String(500, "Not autherizes")
	}

	payload, err:= util.Verify(jwt.Value)
	if err != nil{
		ctx.String(500, "Not autherizes")
	}

	

	return payload.Email
}