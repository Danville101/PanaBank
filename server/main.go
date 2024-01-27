package main

import (
	"backend/api"
	db "backend/db/sqlc"
	"database/sql"
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

	// DB Connection
	con, err:= sql.Open(os.Getenv("DB_DRIVER"), os.Getenv("DB_SOURCE"))
		if err != nil{
			log.Fatal("cannot connect to db:", err)
		}

		runDBMigration(os.Getenv("MIGRATION_URL"), os.Getenv("DB_SOURCE"))

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