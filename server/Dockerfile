FROM golang:1.18

WORKDIR /server


COPY . .
COPY .env .
COPY db/migration ./db/migration
RUN go mod tidy
EXPOSE 8080


