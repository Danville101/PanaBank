CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL
);

CREATE TABLE "account" (
  "id" bigserial PRIMARY KEY,
  "owner" varchar NOT NULL,
  "card_number" bigint NOT NULL,
  "account_number" Int UNIQUE NOT NULL,
  "sort_code" varchar UNIQUE NOT NULL,
  "issued_date" varchar NOT NULL,
  "expire_date" varchar NOT NULL,
  "balance" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "entries" (
  "id" bigserial PRIMARY KEY,
  "amount" bigint NOT NULL,
  "entry_first_name" varchar NOT NULL,
  "entry_last_name" varchar NOT NULL,
  "account_number" int NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "payees" (
  "id" bigserial PRIMARY KEY,
  "payee_first_name" varchar NOT NULL,
  "payee_last_name" varchar NOT NULL,
  "owner_email" varchar NOT NULL,
  "account_number" int NOT NULL,
  "sort_code" varchar NOT NULL
);

CREATE TABLE "transfers" (
  "id" bigserial PRIMARY KEY,
  "from_sort_code" varchar NOT NULL,
  "from_account" int NOT NULL,
  "to_first_name" varchar NOT NULL,
  "to_last_name" varchar NOT NULL,
  "to_sort_code" varchar NOT NULL,
  "to_account" int NOT NULL,
  "amount" bigint NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "users" ("id");

CREATE INDEX ON "users" ("email");

CREATE INDEX ON "entries" ("account_number");

CREATE INDEX ON "transfers" ("from_account");

CREATE INDEX ON "transfers" ("to_account");

CREATE INDEX ON "transfers" ("from_account", "to_account");

ALTER TABLE "account" ADD FOREIGN KEY ("owner") REFERENCES "users" ("email");

ALTER TABLE "entries" ADD FOREIGN KEY ("account_number") REFERENCES "account" ("account_number");

ALTER TABLE "payees" ADD FOREIGN KEY ("owner_email") REFERENCES "users" ("email");

ALTER TABLE "payees" ADD FOREIGN KEY ("account_number") REFERENCES "account" ("account_number");

ALTER TABLE "payees" ADD FOREIGN KEY ("sort_code") REFERENCES "account" ("sort_code");

ALTER TABLE "transfers" ADD FOREIGN KEY ("from_sort_code") REFERENCES "account" ("sort_code");

ALTER TABLE "transfers" ADD FOREIGN KEY ("from_account") REFERENCES "account" ("account_number");

ALTER TABLE "transfers" ADD FOREIGN KEY ("to_sort_code") REFERENCES "account" ("sort_code");

ALTER TABLE "transfers" ADD FOREIGN KEY ("to_account") REFERENCES "account" ("account_number");
