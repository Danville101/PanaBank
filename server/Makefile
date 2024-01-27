DB_URL=postgresql://postgres:villabean101@localhost:5432/PandaBank?sslmode=disable


migration:
	@read -p "Enter migration name: " name; \
	migrate create -ext sql -dir db/migration -seq $$name

migrate:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

generate:
	sqlc generate



dev:
	@reflex -r '.go' -s -- go run main.go