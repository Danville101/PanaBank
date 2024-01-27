package api

import (
	db "backend/db/sqlc"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


type Server struct{
	db   *db.SQLStore
	router *gin.Engine
}

func NewServer( db *db.SQLStore)(*Server, error){

	server :=&Server{db:db}
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowHeaders: []string{"Content-Type","Accept","User-Agent"},
	   }))

	router.POST("/users", server.createUser)
	router.POST("/users/login", server.login)
	
	authGroup := router.Group("/").Use(authMiddleware)
	authGroup.GET("/users/", server.getUser)
	authGroup.GET("/users/account", server.getAccount)
	authGroup.POST("/users/transfer", server.createTransfer)
	authGroup.GET("/users/account/payee", server.getPayees)
	authGroup.POST("/users/account/payeebyid", server.getPaybyId)
	authGroup.GET("/users/account/payee/favourite", server.getPayeeFavourite)


	authGroup.GET("/users/account/entry", server.getEntry)
	authGroup.GET("/users/account/entries", server.listEntries)
	authGroup.POST("/users/logout", server.logout)



	server.router= router

	
	
	return server, nil
}


func (server *Server)Start(address string)error{
	return server.router.Run(address)
}

func errorRespons(err error)gin.H{
	return gin.H{"eeror": err.Error()}
}

