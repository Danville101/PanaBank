package main

import (
	"backend/api"
	db "backend/db/sqlc"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"

	"github.com/joho/godotenv"
)

func main(){
godotenv.Load()


     
     DB_PROTOCOL:= os.Getenv("DB_DRIVER") // postgresql://postgres:

     DB_PASSWORD:=  os.Getenv("DB_PASSWORD") //   villabean101@
     DB_HOST:= os.Getenv("DB_HOST")// localhost
     DB_PORT:= os.Getenv("DB_PORT")// :5432
	DB_USER:= os.Getenv("DB_USER")
	DB_SSL:= os.Getenv("DB_SSL")
     DB_NAME:= os.Getenv("DB_NAME") // /PandaBank?sslmode=disable

	DB_SOURCE:= fmt.Sprintf("%s://%s:%s@%s:%s/%s?%s",DB_PROTOCOL, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME, DB_SSL)

	// DB Connection
	con, err:= sql.Open(os.Getenv("DB_DRIVER"), DB_SOURCE)
		if err != nil{
			log.Fatal("cannot connect to db:", err)
		}

		runDBMigration(os.Getenv("MIGRATION_URL"), DB_SOURCE)

		db:= db.NewStore(con)

		server ,err:= api.NewServer(db)
		if err != nil{
			log.Fatal("can not create server")
		}
		err= server.Start("0.0.0.0:8080")
		if err !=nil{
			log.Fatal("can not start server")
		}

		

		

		
}




func runDBMigration(migrationURL string, dbSource string){
			migration, err := migrate.New(migrationURL, dbSource)
			if err != nil{
				log.Fatal("cannot create new migrate instance:", err)
			}


			if err = migration.Up(); err != nil && err != migrate.ErrNoChange {
				log.Fatal("failed to run migrate up:", err)
			}
		
			log.Println("db migrated successfully")
		}