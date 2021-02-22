
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
--Table for passport js--  
-- **DO NOT TOUCH**
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--Each user will create a profile with personal info which will be stored in the person table
CREATE TABLE "person" (
	"id" SERIAL PRIMARY KEY,
	"firstName" VARCHAR (40) NOT NULL,
	"lastName" VARCHAR (40) NOT NULL, 
	"phone" VARCHAR (20) NOT NULL,
	"email" VARCHAR (40),
	"access" INT DEFAULT 0,
	"user_id" INT REFERENCES "user"
);

--Dummy info
INSERT INTO "person" ("firstName", "lastName", "phone", "email", "user_id")
VALUES ('Jamie', 'Naasz', '7018667860', 'Naaszja@gmail.com', 1);

--Each person will be able to add multiple entries to the equipmen table
CREATE TABLE "equipment" (
	"id" SERIAL PRIMARY KEY,
	"make" VARCHAR (20) NOT NULL,
	"model" VARCHAR (30) NOT NULL,
	"year" INT,
	"person_id" INT REFERENCES "person"
);

--Dummy info
INSERT INTO "equipment" ("make", "model", "year", "person_id")
VALUES ('Trek', 'Mamba', '2012', 1);

--Each piece of equipment can have multiple work orders
CREATE TABLE "work_orders" (
	"id" SERIAL PRIMARY KEY,
	"created" timestamp,
	"services" VARCHAR (2000) NOT NULL, 
	"total_price" INT NOT NULL,
	"person_id" INT REFERENCES "equipment",
	"bike_id" INT REFERENCES "equipment",
	"completed" BOOLEAN DEFAULT false,
	"completed_on" timestamp,
	"completed_by" INT REFERENCES "person" 
);

--Dummy info
INSERT INTO "work_orders" ("created", "services", "total_price", "person_id", "bike_id")
VALUES (CURRENT_TIMESTAMP, 'Complete overhaul', 300, 2, 2);

SELECT * FROM "user";
SELECT * FROM "person";
SELECT * FROM "equipment";
SELECT * FROM "work_orders";
