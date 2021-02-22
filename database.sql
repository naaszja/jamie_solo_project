
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- customer table
CREATE TABLE "customers" (
    "id" SERIAL PRIMARY KEY,
    "Name" VARCHAR (100) NOT NULL,
    "address" VARCHAR (250) NOT NULL
    "phone" VARCHAR (100) NOT NULL,
    "email" VARCHAR (100)
);

-- equipment table
CREATE TABLE "equipment" (
    "id" SERIAL PRIMARY KEY,
    "make" VARCHAR (100) NOT NULL 
    "model" VARCHAR (100) NOT NULL
    "year" int 
    "location" int
    "cusotmer_id" integer REFERENCES customers
);

